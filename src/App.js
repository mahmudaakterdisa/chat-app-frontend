import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  console.log(messages);
  useEffect(() => {
    getMessages();
    setInterval(getMessages, 5000);  // Polling every 5 seconds
  }, []);

  const getMessages = async () => {
    const response = await axios.get('http://localhost:5000/messages');
    setMessages(response.data.results);
  };

  const sendMessage = async () => {
    await axios.post('http://localhost:5000/messages', { username, message });
    setMessage('');
    getMessages();
  };

  return (
    <div>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Enter message" />
      <button onClick={sendMessage}>Send</button>
      {messages && messages.map(msg => <div key={msg.id}>{msg.username}: {msg.message}</div>)}
    </div>
  );
}

export default App;
