from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_huggingface import HuggingFaceEndpoint
from langchain_core.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
import PyPDF2
import json
import os

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for request validation
class ChatRequest(BaseModel):
    query: str

# Hugging Face setup
# HF_TOKEN = os.environ.get("Your Access Token")
# HUGGINGFACE_REPO_ID = "Your Rep ID"

def load_llm(huggingface_repo_id):
    try:
        llm = HuggingFaceEndpoint(
            repo_id=huggingface_repo_id,
            temperature=0.2,
            model_kwargs={"token": HF_TOKEN, "max_length": 2048}  # Increased max_length for detailed responses
        )
        return llm
    except Exception as e:
        print(f"Failed to load Hugging Face endpoint: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to initialize LLM: {str(e)}")

# Optimized prompt to encourage detailed answers, including medications
CUSTOM_PROMPT_TEMPLATE = """
You are Dr. Devo, a medical assistant based on *The Gale Encyclopedia of Medicine*. Using the provided context, answer the user's question as accurately and comprehensively as possible, including specific details about medications or treatments if asked or relevant. Use inference if the context supports it, but do not invent details not present. If the context is insufficient, say 'I don’t have enough information to answer fully based on the encyclopedia. Please consult a healthcare professional.'

Context: {context}
Question: {question}

Start the answer directly.
"""

def set_custom_prompt(custom_prompt_template):
    prompt = PromptTemplate(template=custom_prompt_template, input_variables=["context", "question"])
    return prompt

# Process the PDF and build FAISS vector store
DB_FAISS_PATH = os.path.join(os.path.dirname(__file__), "vectorstore", "db_faiss")
PDF_PATH = r"C:\Users\Ayush Gupte\Desktop\REACT DR. DEVO\dr-devo-frontend\Data\The-Gale-Encyclopedia-of-Medicine-3rd-Edition-staibabussalamsula.ac_.id_.pdf"

def process_pdf():
    try:
        print(f"Checking PDF at: {PDF_PATH}")
        if not os.path.exists(PDF_PATH):
            print(f"PDF not found at {PDF_PATH}")
            return None
        text = ""
        with open(PDF_PATH, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            for page_num, page in enumerate(reader.pages, 1):
                extracted_text = page.extract_text() or ""
                text += f"\nPage {page_num}:\n{extracted_text}"
                print(f"Extracted text from page {page_num}: {extracted_text[:50]}...")
        if not text.strip():
            print("No text extracted from PDF")
            return None
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=300)  # Increased chunk size and overlap
        docs = text_splitter.split_text(text)
        print(f"Split into {len(docs)} chunks")
        embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
        vector_store = FAISS.from_texts(docs, embedding_model)
        vector_store.save_local(DB_FAISS_PATH)
        print(f"FAISS vector store saved to {DB_FAISS_PATH}")
        return docs
    except Exception as e:
        print(f"Error processing PDF: {e}")
        return None

# Load or create FAISS vector store
print(f"Checking FAISS store at: {DB_FAISS_PATH}")
if not os.path.exists(DB_FAISS_PATH):
    print("FAISS store not found, processing PDF...")
    docs = process_pdf()
    if docs is None:
        print("PDF processing failed, using mock data is not implemented here")
else:
    print("Loading existing FAISS store...")
    embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
    db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)
    print("FAISS store loaded successfully")

# Initialize QA chain
llm = load_llm(HUGGINGFACE_REPO_ID)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=db.as_retriever(search_kwargs={'k': 20, 'score_threshold': 0.2}),  # Optimized retrieval
    return_source_documents=True,
    chain_type_kwargs={'prompt': set_custom_prompt(CUSTOM_PROMPT_TEMPLATE)}
)
print("QA chain initialized successfully")

# History management
def load_history():
    try:
        if os.path.exists("chat_history.json"):
            with open("chat_history.json", "r", encoding="utf-8") as f:
                return json.load(f)
        return []
    except Exception as e:
        print(f"Error loading history: {e}")
        return []

def save_history(messages):
    try:
        with open("chat_history.json", "w", encoding="utf-8") as f:
            json.dump(messages, f, indent=4)
    except Exception as e:
        print(f"Error saving history: {e}")

def clear_history():
    try:
        if os.path.exists("chat_history.json"):
            os.remove("chat_history.json")
        return []
    except Exception as e:
        print(f"Error clearing history: {e}")
        return []

# API Endpoints
@app.post("/chat")
async def chat(request: ChatRequest):
    query = request.query
    print(f"Received query: {query}")
    if not query or not query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty or only whitespace.")
    
    response = qa_chain.invoke({'query': query})
    result = response["result"]
    source_docs = response["source_documents"]
    context = " ".join(doc.page_content[:100] + "..." for doc in source_docs) if source_docs else "None"

    message = {"role": "assistant", "content": f"**Answer:** {result}\n**Context:** {context}"}
    messages = load_history()
    messages.append({"role": "user", "content": query})
    messages.append(message)
    save_history(messages)
    print(f"Returning response: {result}")

    return {"response": result, "context": context}

@app.get("/history")
async def get_history():
    history = load_history()
    print(f"Returning history: {history}")
    return history

@app.post("/clear")
async def clear():
    clear_history()
    print("History cleared")
    return {"message": "History cleared"}