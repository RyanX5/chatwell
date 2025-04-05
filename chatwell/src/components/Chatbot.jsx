import React, { useState } from 'react';
import './Chatbot.css'; // Ensure this path is correct

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);

  const handleSend = () => {
    if (input.trim() || file) {
      const newMessage = { text: input, sender: 'user', file };
      setMessages([...messages, newMessage]);
      setInput('');
      setFile(null);

      // Simulate a bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'This is a simulated response from the bot.', sender: 'bot' },
        ]);
      }, 1000);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            {msg.text}
            {msg.file && <p>Attachment: {msg.file.name}</p>}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;