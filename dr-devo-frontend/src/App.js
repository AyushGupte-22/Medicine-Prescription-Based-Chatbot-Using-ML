// // // // import logo from './logo.svg';
// // // // import './App.css';

// // // // function App() {
// // // //   return (
// // // //     <div className="App">
// // // //       <header className="App-header">
// // // //         <img src={logo} className="App-logo" alt="logo" />
// // // //         <p>
// // // //           Edit <code>src/App.js</code> and save to reload.
// // // //         </p>
// // // //         <a
// // // //           className="App-link"
// // // //           href="https://reactjs.org"
// // // //           target="_blank"
// // // //           rel="noopener noreferrer"
// // // //         >
// // // //           Learn React
// // // //         </a>
// // // //       </header>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import './App.css';

// // // function App() {
// // //   const [messages, setMessages] = useState([]);
// // //   const [input, setInput] = useState(''); // Explicitly initialize as empty string
// // //   const [view, setView] = useState('chat');

// // //   useEffect(() => {
// // //     fetchHistory();
// // //   }, []);

// // //   const fetchHistory = async () => {
// // //     try {
// // //       console.log("Fetching history...");
// // //       const response = await axios.get('http://localhost:8000/history');
// // //       console.log("History response:", response.data);
// // //       setMessages(response.data);
// // //     } catch (error) {
// // //       console.error("Failed to fetch history:", error.message);
// // //       setMessages([]);
// // //     }
// // //   };

// // //   const handleSend = async () => {
// // //     console.log("handleSend triggered with raw input:", input);

// // //     // Ensure input is always a string and trim it
// // //     const trimmedInput = (input || '').trim();
    
// // //     console.log("Trimmed input for validation:", trimmedInput);

// // //     // Stricter validation
// // //     if (!trimmedInput || trimmedInput.length === 0) {
// // //       console.log("Input is empty, whitespace, null, or undefined:", input);
// // //       const errorMessage = { role: 'assistant', content: 'Error: Please enter a valid query.' };
// // //       setMessages(prevMessages => [...prevMessages, errorMessage]);
// // //       return;
// // //     }

// // //     // Log the request body before sending
// // //     const requestBody = { query: trimmedInput };
// // //     console.log("Sending request with body:", JSON.stringify(requestBody));

// // //     const userMessage = { role: 'user', content: trimmedInput };
// // //     setMessages(prevMessages => [...prevMessages, userMessage]);
// // //     try {
// // //       const response = await axios.post('http://localhost:8000/chat', requestBody, {
// // //         headers: { 'Content-Type': 'application/json' },
// // //       });
// // //       console.log("Chat response:", response.data);
// // //       const assistantMessage = {
// // //         role: 'assistant',
// // //         content: response.data.response
// // //           ? `**Answer:** ${response.data.response}\n**Context:** ${response.data.context || 'None'}`
// // //           : "Error: No valid response received from the server.",
// // //       };
// // //       setMessages(prevMessages => [...prevMessages, assistantMessage]);
// // //       setInput(''); // Clear input only after successful request
// // //     } catch (error) {
// // //       console.error("Failed to send message:", error.response ? error.response.data : error.message);
// // //       const errorMessage = { role: 'assistant', content: `Error: Failed to get a response from the server. Details: ${error.message}` };
// // //       setMessages(prevMessages => [...prevMessages, errorMessage]);
// // //     }
// // //   };

// // //   const handleKeyPress = (e) => {
// // //     console.log("Key pressed:", e.key);
// // //     if (e.key === 'Enter') {
// // //       handleSend();
// // //     }
// // //   };

// // //   const handleClear = async () => {
// // //     try {
// // //       console.log("Clearing history...");
// // //       await axios.post('http://localhost:8000/clear');
// // //       setMessages([]);
// // //       fetchHistory();
// // //     } catch (error) {
// // //       console.error("Failed to clear history:", error.message);
// // //     }
// // //   };

// // //   return (
// // //     <div className="app">
// // //       <div className="sidebar">
// // //         <h2>Features</h2>
// // //         <p>Medical Chatbot powered by The Gale Encyclopedia of Medicine</p>
// // //         <button onClick={handleClear}>Clear History</button>
// // //         <h3>Chat Options</h3>
// // //         <button onClick={() => setView('chat')}>Chat bot</button>
// // //         <button onClick={() => setView('history')}>Chat History</button>
// // //       </div>
// // //       <div className="main">
// // //         <div className="header">
// // //           <h1>Dr. Devo</h1>
// // //           <p>Your personal medical assistant</p>
// // //         </div>
// // //         {view === 'chat' ? (
// // //           <div className="chat-container">
// // //             {messages.map((msg, index) => (
// // //               <div key={index} className={`message ${msg.role}`}>
// // //                 {msg.content.split('\n').map((line, i) => (
// // //                   <p key={i} style={{ margin: '0 0 5px' }}>{line}</p>
// // //                 ))}
// // //               </div>
// // //             ))}
// // //             <div className="input-area">
// // //               <input
// // //                 type="text"
// // //                 value={input}
// // //                 onChange={(e) => {
// // //                   console.log("Input changed to:", e.target.value);
// // //                   setInput(e.target.value || ''); // Ensure input is never null/undefined
// // //                 }}
// // //                 onKeyPress={handleKeyPress}
// // //                 placeholder="Type here..."
// // //               />
// // //               <button onClick={handleSend}>Send</button>
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <div className="chat-container">
// // //             <h2>Chat History</h2>
// // //             {messages.length > 0 ? (
// // //               messages.map((msg, index) => (
// // //                 <div key={index} className="message">
// // //                   {msg.role}: {msg.content.split('\n').map((line, i) => (
// // //                     <p key={i} style={{ margin: '0 0 5px' }}>{line}</p>
// // //                   ))}
// // //                 </div>
// // //               ))
// // //             ) : (
// // //               <p>No chat history available.</p>
// // //             )}
// // //           </div>
// // //         )}
// // //         <div className="disclaimer">
// // //           Disclaimer: Dr. Devo provides information based on *The Gale Encyclopedia of Medicine*. Consult a healthcare professional for medical advice.
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default App;






// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './App.css';

// // function App() {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState(''); // Explicitly initialize as empty string
// //   const [view, setView] = useState('chat');

// //   useEffect(() => {
// //     fetchHistory();
// //   }, []);

// //   const fetchHistory = async () => {
// //     try {
// //       console.log("Fetching history...");
// //       const response = await axios.get('http://localhost:8000/history');
// //       console.log("History response:", response.data);
// //       setMessages(response.data);
// //     } catch (error) {
// //       console.error("Failed to fetch history:", error.message);
// //       setMessages([]);
// //     }
// //   };

// //   const handleSend = async () => {
// //     console.log("handleSend triggered with raw input:", input);

// //     // Ensure input is always a string and trim it
// //     const trimmedInput = (input || '').trim();
    
// //     console.log("Trimmed input for validation:", trimmedInput);

// //     // Stricter validation
// //     if (!trimmedInput || trimmedInput.length === 0) {
// //       console.log("Input is empty, whitespace, null, or undefined:", input);
// //       const errorMessage = { role: 'assistant', content: 'Error: Please enter a valid query.' };
// //       setMessages(prevMessages => [...prevMessages, errorMessage]);
// //       return;
// //     }

// //     // Log the request body before sending
// //     const requestBody = { query: trimmedInput };
// //     console.log("Sending request with body:", JSON.stringify(requestBody));

// //     const userMessage = { role: 'user', content: trimmedInput };
// //     setMessages(prevMessages => [...prevMessages, userMessage]);
// //     try {
// //       const response = await axios.post('http://localhost:8000/chat', requestBody, {
// //         headers: { 'Content-Type': 'application/json' },
// //       });
// //       console.log("Chat response:", response.data);
// //       const assistantMessage = {
// //         role: 'assistant',
// //         content: response.data.response
// //           ? `**Answer:** ${response.data.response}\n**Context:** ${response.data.context || 'None'}`
// //           : "Error: No valid response received from the server.",
// //       };
// //       setMessages(prevMessages => [...prevMessages, assistantMessage]);
// //       setInput(''); // Clear input only after successful request
// //     } catch (error) {
// //       console.error("Failed to send message:", error.response ? error.response.data : error.message);
// //       const errorMessage = { role: 'assistant', content: `Error: Failed to get a response from the server. Details: ${error.message}` };
// //       setMessages(prevMessages => [...prevMessages, errorMessage]);
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     console.log("Key pressed:", e.key);
// //     if (e.key === 'Enter') {
// //       handleSend();
// //     }
// //   };

// //   const handleClear = async () => {
// //     try {
// //       console.log("Clearing history...");
// //       await axios.post('http://localhost:8000/clear');
// //       setMessages([]);
// //       fetchHistory();
// //     } catch (error) {
// //       console.error("Failed to clear history:", error.message);
// //     }
// //   };

// //   return (
// //     <div className="app">
// //       <div className="sidebar">
// //         <h2>Features</h2>
// //         <p>Medical Chatbot powered by *The Gale Encyclopedia of Medicine*</p>
// //         <button onClick={handleClear}>Clear History</button>
// //         <h3>Chat Options</h3>
// //         <button onClick={() => setView('chat')}>Chat bot</button>
// //         <button onClick={() => setView('history')}>Chat History</button>
// //       </div>
// //       <div className="main">
// //         <div className="header">
// //           <h1>Dr. Devo</h1>
// //           <p>Your personal medical assistant</p>
// //         </div>
// //         {view === 'chat' ? (
// //           <div className="chat-container">
// //             {messages.map((msg, index) => (
// //               <div key={index} className={`message ${msg.role}`}>
// //                 {msg.content.split('\n').map((line, i) => (
// //                   <p key={i} style={{ margin: '0 0 5px' }}>{line}</p>
// //                 ))}
// //               </div>
// //             ))}
// //             <div className="input-area">
// //               <input
// //                 type="text"
// //                 value={input}
// //                 onChange={(e) => {
// //                   console.log("Input changed to:", e.target.value);
// //                   setInput(e.target.value || ''); // Ensure input is never null/undefined
// //                 }}
// //                 onKeyPress={handleKeyPress}
// //                 placeholder="Type here..."
// //               />
// //               <button onClick={handleSend}>Send</button>
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="chat-container">
// //             <h2>Chat History</h2>
// //             {messages.length > 0 ? (
// //               messages.map((msg, index) => (
// //                 <div key={index} className="message">
// //                   {msg.role}: {msg.content.split('\n').map((line, i) => (
// //                     <p key={i} style={{ margin: '0 0 5px' }}>{line}</p>
// //                   ))}
// //                 </div>
// //               ))
// //             ) : (
// //               <p>No chat history available.</p>
// //             )}
// //           </div>
// //         )}
// //         <div className="disclaimer">
// //           Disclaimer: Dr. Devo provides information based on *The Gale Encyclopedia of Medicine*. Consult a healthcare professional for medical advice.
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;





// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './App.css';

// // function App() {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const [recentPrompts, setRecentPrompts] = useState([]); // State for recent prompts
// //   const [view, setView] = useState('chat');

// //   useEffect(() => {
// //     fetchHistory();
// //   }, []);

// //   const fetchHistory = async () => {
// //     try {
// //       console.log("Fetching history...");
// //       const response = await axios.get('http://localhost:8000/history');
// //       console.log("History response:", response.data);
// //       setMessages(response.data);
// //       // Populate recent prompts from history (only user messages)
// //       const prompts = response.data
// //         .filter(msg => msg.role === 'user')
// //         .map(msg => msg.content);
// //       setRecentPrompts(prompts.slice(-5)); // Show last 5 prompts
// //     } catch (error) {
// //       console.error("Failed to fetch history:", error.message);
// //       setMessages([]);
// //       setRecentPrompts([]);
// //     }
// //   };

// //   const handleSend = async () => {
// //     console.log("handleSend triggered with raw input:", input);

// //     const trimmedInput = (input || '').trim();
// //     console.log("Trimmed input for validation:", trimmedInput);

// //     if (!trimmedInput || trimmedInput.length === 0) {
// //       console.log("Input is empty, whitespace, null, or undefined:", input);
// //       const errorMessage = { role: 'assistant', content: 'Error: Please enter a valid query.' };
// //       setMessages(prevMessages => [...prevMessages, errorMessage]);
// //       return;
// //     }

// //     const requestBody = { query: trimmedInput };
// //     console.log("Sending request with body:", JSON.stringify(requestBody));

// //     const userMessage = { role: 'user', content: trimmedInput };
// //     setMessages(prevMessages => [...prevMessages, userMessage]);
// //     setRecentPrompts(prevPrompts => [...prevPrompts, trimmedInput].slice(-5)); // Add to recent prompts (last 5)

// //     try {
// //       const response = await axios.post('http://localhost:8000/chat', requestBody, {
// //         headers: { 'Content-Type': 'application/json' },
// //       });
// //       console.log("Chat response:", response.data);
// //       const assistantMessage = {
// //         role: 'assistant',
// //         content: response.data.response
// //           ? `**Answer:** ${response.data.response}\n**Context:** ${response.data.context || 'None'}`
// //           : "Error: No valid response received from the server.",
// //       };
// //       setMessages(prevMessages => [...prevMessages, assistantMessage]);
// //       setInput('');
// //     } catch (error) {
// //       console.error("Failed to send message:", error.response ? error.response.data : error.message);
// //       const errorMessage = { role: 'assistant', content: `Error: Failed to get a response from the server. Details: ${error.message}` };
// //       setMessages(prevMessages => [...prevMessages, errorMessage]);
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     console.log("Key pressed:", e.key);
// //     if (e.key === 'Enter') {
// //       handleSend();
// //     }
// //   };

// //   const handleClear = async () => {
// //     try {
// //       console.log("Clearing history...");
// //       await axios.post('http://localhost:8000/clear');
// //       setMessages([]);
// //       setRecentPrompts([]);
// //       fetchHistory();
// //     } catch (error) {
// //       console.error("Failed to clear history:", error.message);
// //     }
// //   };

// //   // Suggested prompts
// //   const suggestedPrompts = [
// //     "What are the medications for pneumonia?",
// //     "What causes diabetes?",
// //     "How can I manage hypertension?",
// //   ];

// //   return (
// //     <div className="app">
// //       <div className="sidebar">
// //         <h2>Recent Prompts</h2>
// //         {recentPrompts.length > 0 ? (
// //           <ul>
// //             {recentPrompts.map((prompt, index) => (
// //               <li
// //                 key={index}
// //                 onClick={() => {
// //                   setInput(prompt);
// //                   setView('chat');
// //                 }}
// //                 className="recent-prompt"
// //               >
// //                 {prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt}
// //               </li>
// //             ))}
// //           </ul>
// //         ) : (
// //           <p>No recent prompts.</p>
// //         )}
// //         <button onClick={handleClear}>Clear History</button>
// //         <h3>View Options</h3>
// //         <button onClick={() => setView('chat')}>Chat Bot</button>
// //         <button onClick={() => setView('history')}>Chat History</button>
// //       </div>
// //       <div className="main">
// //         <div className="header">
// //           <h1>Dr. Devo</h1>
// //           <p>Your personal medical assistant</p>
// //         </div>
// //         {view === 'chat' ? (
// //           <div className="chat-container">
// //             {messages.length === 0 ? (
// //               <div className="welcome-message">
// //                 <h2>Ask Dr. Devo Anything</h2>
// //                 <p>I'm here to help with medical questions based on *The Gale Encyclopedia of Medicine*.</p>
// //               </div>
// //             ) : (
// //               messages.map((msg, index) => (
// //                 <div key={index} className={`message ${msg.role}`}>
// //                   <span className="message-label">{msg.role === 'user' ? 'ME' : 'DR. DEVO'}</span>
// //                   {msg.content.split('\n').map((line, i) => (
// //                     <p key={i} style={{ margin: '0 0 5px' }}>{line}</p>
// //                   ))}
// //                 </div>
// //               ))
// //             )}
// //             <div className="input-area">
// //               <input
// //                 type="text"
// //                 value={input}
// //                 onChange={(e) => {
// //                   console.log("Input changed to:", e.target.value);
// //                   setInput(e.target.value || '');
// //                 }}
// //                 onKeyPress={handleKeyPress}
// //                 placeholder="Ask me anything..."
// //               />
// //               <button onClick={handleSend}>➤</button>
// //             </div>
// //             {messages.length === 0 && (
// //               <div className="suggested-prompts">
// //                 {suggestedPrompts.map((prompt, index) => (
// //                   <button
// //                     key={index}
// //                     className="suggested-prompt"
// //                     onClick={() => setInput(prompt)}
// //                   >
// //                     {prompt}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         ) : (
// //           <div className="chat-container">
// //             <h2>Chat History</h2>
// //             {messages.length > 0 ? (
// //               messages.map((msg, index) => (
// //                 <div key={index} className="message">
// //                   {msg.role}: {msg.content.split('\n').map((line, i) => (
// //                     <p key={i} style={{ margin: '0 0 5px' }}>{line}</p>
// //                   ))}
// //                 </div>
// //               ))
// //             ) : (
// //               <p>No chat history available.</p>
// //             )}
// //           </div>
// //         )}
// //         <div className="disclaimer">
// //           Disclaimer: Dr. Devo provides information based on *The Gale Encyclopedia of Medicine*. Consult a healthcare professional for medical advice.
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [recentPrompts, setRecentPrompts] = useState([]);
//   const [view, setView] = useState('chat');

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       console.log("Fetching history...");
//       const response = await axios.get('http://localhost:8000/history');
//       console.log("History response:", response.data);
//       setMessages(response.data);
//       const prompts = response.data
//         .filter(msg => msg.role === 'user')
//         .map(msg => msg.content);
//       setRecentPrompts(prompts.slice(-5));
//     } catch (error) {
//       console.error("Failed to fetch history:", error.message);
//       setMessages([]);
//       setRecentPrompts([]);
//     }
//   };

//   const handleSend = async () => {
//     console.log("handleSend triggered with raw input:", input);

//     const trimmedInput = (input || '').trim();
//     console.log("Trimmed input for validation:", trimmedInput);

//     if (!trimmedInput || trimmedInput.length === 0) {
//       console.log("Input is empty, whitespace, null, or undefined:", input);
//       const errorMessage = { role: 'assistant', content: 'Error: Please enter a valid query.' };
//       setMessages(prevMessages => [...prevMessages, errorMessage]);
//       return;
//     }

//     const requestBody = { query: trimmedInput };
//     console.log("Sending request with body:", JSON.stringify(requestBody));

//     const userMessage = { role: 'user', content: trimmedInput };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setRecentPrompts(prevPrompts => [...prevPrompts, trimmedInput].slice(-5));

//     try {
//       const response = await axios.post('http://localhost:8000/chat', requestBody, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       console.log("Chat response:", response.data);
//       const assistantMessage = {
//         role: 'assistant',
//         content: response.data.response
//           ? `**Answer:** ${response.data.response}\n**Context:** ${response.data.context || 'None'}`
//           : "Error: No valid response received from the server.",
//       };
//       setMessages(prevMessages => [...prevMessages, assistantMessage]);
//       setInput('');
//     } catch (error) {
//       console.error("Failed to send message:", error.response ? error.response.data : error.message);
//       const errorMessage = { role: 'assistant', content: `Error: Failed to get a response from the server. Details: ${error.message}` };
//       setMessages(prevMessages => [...prevMessages, errorMessage]);
//     }
//   };

//   const handleKeyPress = (e) => {
//     console.log("Key pressed:", e.key);
//     if (e.key === 'Enter') {
//       handleSend();
//     }
//   };

//   const handleClear = async () => {
//     try {
//       console.log("Clearing history...");
//       await axios.post('http://localhost:8000/clear');
//       setMessages([]);
//       setRecentPrompts([]);
//       fetchHistory();
//     } catch (error) {
//       console.error("Failed to clear history:", error.message);
//     }
//   };

//   const suggestedPrompts = [
//     "What are the medications for pneumonia?",
//     "What causes diabetes?",
//     "How can I manage hypertension?",
//   ];

//   return (
//     <div className="app">
//       <div className="sidebar">
//         <h2>Recent Prompts</h2>
//         {recentPrompts.length > 0 ? (
//           <ul>
//             {recentPrompts.map((prompt, index) => (
//               <li
//                 key={index}
//                 onClick={() => {
//                   setInput(prompt);
//                   setView('chat');
//                 }}
//                 className="recent-prompt"
//               >
//                 <span className="prompt-icon">✨</span>
//                 {prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No recent prompts.</p>
//         )}
//         <button onClick={handleClear}>Clear History</button>
//         <h3>View Options</h3>
//         <button onClick={() => setView('chat')}>Chat Bot</button>
//         <button onClick={() => setView('history')}>Chat History</button>
//       </div>
//       <div className="main">
//         <div className="header">
//           <h1>Dr. Devo</h1>
//           <p>Your cosmic medical assistant</p>
//         </div>
//         {view === 'chat' ? (
//           <div className="chat-container">
//             {messages.length === 0 ? (
//               <div className="welcome-message">
//                 <h2>Ask Dr. Devo Anything</h2>
//                 <p>Powered by *The Gale Encyclopedia of Medicine*, with a touch of cosmic insight.</p>
//               </div>
//             ) : (
//               messages.map((msg, index) => (
//                 <div key={index} className={`message ${msg.role}`}>
//                   <span className="message-label">{msg.role === 'user' ? 'YOU' : 'DR. DEVO'}</span>
//                   {msg.content.split('\n').map((line, i) => (
//                     <p key={i} style={{ margin: '0 0 5px' }}>{line}</p>
//                   ))}
//                 </div>
//               ))
//             )}
//             <div className="input-area">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => {
//                   console.log("Input changed to:", e.target.value);
//                   setInput(e.target.value || '');
//                 }}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Ask me anything..."
//               />
//               <button onClick={handleSend}>➤</button>
//             </div>
//             {messages.length === 0 && (
//               <div className="suggested-prompts">
//                 {suggestedPrompts.map((prompt, index) => (
//                   <button
//                     key={index}
//                     className="suggested-prompt"
//                     onClick={() => setInput(prompt)}
//                   >
//                     {prompt}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="chat-container">
//             <h2>Chat History</h2>
//             {messages.length > 0 ? (
//               messages.map((msg, index) => (
//                 <div key={index} className="message">
//                   {msg.role}: {msg.content.split('\n').map((line, i) => (
//                     <p key={i} style={{ margin: '0 0 5px' }}>{line}</p>
//                   ))}
//                 </div>
//               ))
//             ) : (
//               <p>No chat history available.</p>
//             )}
//           </div>
//         )}
//         <div className="disclaimer">
//           Disclaimer: Dr. Devo provides information based on *The Gale Encyclopedia of Medicine*. Consult a healthcare professional for medical advice.
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [recentPrompts, setRecentPrompts] = useState([]);
//   const [view, setView] = useState('chat');

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       console.log("Fetching history...");
//       const response = await axios.get('http://localhost:8000/history');
//       console.log("History response:", response.data);
//       setMessages(response.data);
//       const prompts = response.data
//         .filter(msg => msg.role === 'user')
//         .map(msg => msg.content);
//       setRecentPrompts(prompts.slice(-5));
//     } catch (error) {
//       console.error("Failed to fetch history:", error.message);
//       setMessages([]);
//       setRecentPrompts([]);
//     }
//   };

//   const handleSend = async () => {
//     console.log("handleSend triggered with raw input:", input);

//     const trimmedInput = (input || '').trim();
//     console.log("Trimmed input for validation:", trimmedInput);

//     if (!trimmedInput || trimmedInput.length === 0) {
//       console.log("Input is empty, whitespace, null, or undefined:", input);
//       const errorMessage = { role: 'assistant', content: 'Error: Please enter a valid query.' };
//       setMessages(prevMessages => [...prevMessages, errorMessage]);
//       return;
//     }

//     const requestBody = { query: trimmedInput };
//     console.log("Sending request with body:", JSON.stringify(requestBody));

//     const userMessage = { role: 'user', content: trimmedInput };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setRecentPrompts(prevPrompts => [...prevPrompts, trimmedInput].slice(-5));

//     try {
//       const response = await axios.post('http://localhost:8000/chat', requestBody, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       console.log("Chat response:", response.data);
//       const assistantMessage = {
//         role: 'assistant',
//         content: response.data.response
//           ? `**Answer:** ${response.data.response}\n**Context:** ${response.data.context || 'None'}`
//           : "Error: No valid response received from the server.",
//       };
//       setMessages(prevMessages => [...prevMessages, assistantMessage]);
//       setInput('');
//     } catch (error) {
//       console.error("Failed to send message:", error.response ? error.response.data : error.message);
//       const errorMessage = { role: 'assistant', content: `Error: Failed to get a response from the server. Details: ${error.message}` };
//       setMessages(prevMessages => [...prevMessages, errorMessage]);
//     }
//   };

//   const handleKeyPress = (e) => {
//     console.log("Key pressed:", e.key);
//     if (e.key === 'Enter') {
//       handleSend();
//     }
//   };

//   const handleClear = async () => {
//     try {
//       console.log("Clearing history...");
//       await axios.post('http://localhost:8000/clear');
//       setMessages([]);
//       setRecentPrompts([]);
//       fetchHistory();
//     } catch (error) {
//       console.error("Failed to clear history:", error.message);
//     }
//   };

//   const suggestedPrompts = [
//     "What are the medications for pneumonia?",
//     "What causes diabetes?",
//     "How can I manage hypertension?",
//   ];

//   return (
//     <div className="app">
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <h2>Dr. Devo</h2>
//           <p>Recent Prompts</p>
//         </div>
//         {recentPrompts.length > 0 ? (
//           <ul>
//             {recentPrompts.map((prompt, index) => (
//               <li
//                 key={index}
//                 onClick={() => {
//                   setInput(prompt);
//                   setView('chat');
//                 }}
//                 className="recent-prompt"
//               >
//                 <span className="prompt-icon">💬</span>
//                 {prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No recent prompts.</p>
//         )}
//         <div className="sidebar-actions">
//           <button onClick={handleClear}>Clear History</button>
//           <button onClick={() => setView('chat')}>Chat Bot</button>
//           <button onClick={() => setView('history')}>Chat History</button>
//         </div>
//       </div>
//       <div className="main">
//         <div className="header">
//           <h1>Dr. Devo</h1>
//           <p>Your Cosmic Medical Assistant</p>
//         </div>
//         {view === 'chat' ? (
//           <div className="chat-container">
//             {messages.length === 0 ? (
//               <div className="welcome-message">
//                 <h2>Ask Dr. Devo Anything</h2>
//                 <p>Powered by *The Gale Encyclopedia of Medicine*, with a cosmic touch.</p>
//               </div>
//             ) : (
//               messages.map((msg, index) => (
//                 <div key={index} className={`message ${msg.role}`}>
//                   <span className="message-label">{msg.role === 'user' ? 'YOU' : 'DR. DEVO'}</span>
//                   {msg.content.split('\n').map((line, i) => (
//                     <p key={i} style={{ margin: '0 0 5px' }}>{line}</p>
//                   ))}
//                 </div>
//               ))
//             )}
//             <div className="input-area">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => {
//                   console.log("Input changed to:", e.target.value);
//                   setInput(e.target.value || '');
//                 }}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Ask me anything..."
//               />
//               <button onClick={handleSend}>➤</button>
//             </div>
//             {messages.length === 0 && (
//               <div className="suggested-prompts">
//                 {suggestedPrompts.map((prompt, index) => (
//                   <button
//                     key={index}
//                     className="suggested-prompt"
//                     onClick={() => setInput(prompt)}
//                   >
//                     {prompt}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="chat-container">
//             <h2>Chat History</h2>
//             {messages.length > 0 ? (
//               messages.map((msg, index) => (
//                 <div key={index} className="message">
//                   {msg.role}: {msg.content.split('\n').map((line, i) => (
//                     <p key={i} style={{ margin: '0 0 5px' }}>{line}</p>
//                   ))}
//                 </div>
//               ))
//             ) : (
//               <p>No chat history available.</p>
//             )}
//           </div>
//         )}
//         <div className="disclaimer">
//           Disclaimer: Dr. Devo provides information based on *The Gale Encyclopedia of Medicine*. Consult a healthcare professional for medical advice.
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [recentPrompts, setRecentPrompts] = useState([]);
  const [view, setView] = useState('chat');
  const [isTyping, setIsTyping] = useState(false); // For typing indicator
  const [theme, setTheme] = useState('dark'); // Theme state (dark/light)

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      console.log("Fetching history...");
      const response = await axios.get('http://localhost:8000/history');
      console.log("History response:", response.data);
      setMessages(response.data);
      const prompts = response.data
        .filter(msg => msg.role === 'user')
        .map(msg => msg.content);
      setRecentPrompts(prompts.slice(-5));
    } catch (error) {
      console.error("Failed to fetch history:", error.message);
      setMessages([]);
      setRecentPrompts([]);
    }
  };

  const handleSend = async () => {
    console.log("handleSend triggered with raw input:", input);

    const trimmedInput = (input || '').trim();
    console.log("Trimmed input for validation:", trimmedInput);

    if (!trimmedInput || trimmedInput.length === 0) {
      console.log("Input is empty, whitespace, null, or undefined:", input);
      const errorMessage = { 
        role: 'assistant', 
        content: 'Error: Please enter a valid query.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      return;
    }

    const userMessage = { 
      role: 'user', 
      content: trimmedInput, 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setRecentPrompts(prevPrompts => [...prevPrompts, trimmedInput].slice(-5));
    setIsTyping(true); // Show typing indicator

    try {
      const response = await axios.post('http://localhost:8000/chat', { query: trimmedInput }, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("Chat response:", response.data);
      const assistantMessage = {
        role: 'assistant',
        content: response.data.response
          ? `**Answer:** ${response.data.response}\n**Context:** ${response.data.context || 'None'}`
          : "Error: No valid response received from the server.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setInput('');
    } catch (error) {
      console.error("Failed to send message:", error.response ? error.response.data : error.message);
      const errorMessage = { 
        role: 'assistant', 
        content: `Error: Failed to get a response from the server. Details: ${error.message}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false); // Hide typing indicator
    }
  };

  const handleKeyPress = (e) => {
    console.log("Key pressed:", e.key);
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleClear = async () => {
    try {
      console.log("Clearing history...");
      await axios.post('http://localhost:8000/clear');
      setMessages([]);
      setRecentPrompts([]);
      fetchHistory();
    } catch (error) {
      console.error("Failed to clear history:", error.message);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const suggestedPrompts = [
    "What are the medications for pneumonia?",
    "What causes diabetes?",
    "How can I manage hypertension?",
  ];

  return (
    <div className={`app ${theme}`}>
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Dr. Devo</h2>
          <p>Recent Prompts</p>
        </div>
        {recentPrompts.length > 0 ? (
          <ul>
            {recentPrompts.map((prompt, index) => (
              <li
                key={index}
                onClick={() => {
                  console.log("Recent prompt clicked:", prompt);
                  setInput(prompt);
                  setView('chat');
                }}
                className="recent-prompt"
              >
                <span className="prompt-icon">💬</span>
                {prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent prompts.</p>
        )}
        <div className="sidebar-actions">
          <button onClick={handleClear}>Clear History</button>
          <button onClick={() => setView('chat')}>Chat Bot</button>
          <button onClick={() => setView('history')}>Chat History</button>
          <button onClick={toggleTheme}>
            {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>
      </div>
      <div className="main">
        <div className="header">
          <h1>Dr. Devo</h1>
          <p>Your Cosmic Medical Assistant</p>
        </div>
        {view === 'chat' ? (
          <div className="chat-container">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <h2>Ask Dr. Devo Anything</h2>
                <p>Powered by *The Gale Encyclopedia of Medicine*, with a cosmic touch.</p>
              </div>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.role}`}>
                    {msg.role === 'assistant' && <span className="message-avatar">🩺</span>}
                    <div className="message-content">
                      <span className="message-label">{msg.role === 'user' ? 'YOU' : 'DR. DEVO'}</span>
                      {msg.content.split('\n').map((line, i) => (
                        <p key={i} style={{ margin: '0 0 5px' }}>{line}</p>
                      ))}
                      <span className="message-timestamp">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="typing-indicator">
                    <span>Dr. Devo is typing</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </div>
                )}
              </>
            )}
            <div className="input-area">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  console.log("Input changed to:", e.target.value);
                  setInput(e.target.value || '');
                }}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
              />
              <button onClick={handleSend}>➤</button>
            </div>
            {messages.length === 0 && (
              <div className="suggested-prompts">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className="suggested-prompt"
                    onClick={() => {
                      console.log("Suggested prompt clicked:", prompt);
                      setInput(prompt);
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="chat-container">
            <h2>Chat History</h2>
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className={`message ${msg.role}`}>
                  {msg.role === 'assistant' && <span className="message-avatar">🩺</span>}
                  <div className="message-content">
                    <span className="message-label">{msg.role === 'user' ? 'YOU' : 'DR. DEVO'}</span>
                    {msg.content.split('\n').map((line, i) => (
                      <p key={i} style={{ margin: '0 0 5px' }}>{line}</p>
                    ))}
                    <span className="message-timestamp">{msg.timestamp}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No chat history available.</p>
            )}
          </div>
        )}
        <div className="disclaimer">
          Disclaimer: Dr. Devo provides information based on *The Gale Encyclopedia of Medicine*. Consult a healthcare professional for medical advice.
        </div>
      </div>
    </div>
  );
}

export default App;