require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for user information
let userInfo = null;

// In-memory storage for chat history
const chatHistories = new Map();

// Initialize Gemini API
const API_KEY = "AIzaSyDBnqclX6HR-tzjQgTh-F58ocdwXyDh2cw"; // This will be replaced by the user
const genAI = new GoogleGenerativeAI(API_KEY);

// Store user information
app.post('/api/user-info', (req, res) => {
  try {
    const { name, age, location, allergies, diseases, gender } = req.body;
    
    // Validate required fields
    if (!name || !age || !location) {
      return res.status(400).json({ error: 'Name, age, and location are required' });
    }
    
    // Store user information in memory
    userInfo = {
      name,
      age,
      location,
      allergies: allergies || 'None',
      diseases: diseases || 'None',
      gender: gender || 'None',
      timestamp: new Date().toISOString()
    };
    
    // Generate a unique session ID for this user
    const sessionId = Date.now().toString();
    chatHistories.set(sessionId, []);
    
    console.log('User information stored:', userInfo);
    
    res.status(200).json({ 
      message: 'User information stored successfully',
      sessionId 
    });
  } catch (error) {
    console.error('Error storing user information:', error);
    res.status(500).json({ error: 'Failed to store user information' });
  }
});

// Chat endpoint with Gemini API integration
app.post('/api/chat', async (req, res) => {
  try {
    if (!userInfo) {
      return res.status(400).json({ error: 'User information not found. Please fill out the form first.' });
    }

    const { message, sessionId = 'default' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get or initialize chat history for this session
    if (!chatHistories.has(sessionId)) {
      chatHistories.set(sessionId, []);
    }

    const history = chatHistories.get(sessionId);

    // Add system instruction to history if it's a new session
    if (history.length === 0) {
      history.push({
        role: 'model',
        parts: [{
          text: `You are a compassionate and highly knowledgeable doctor.
Your goal is to provide accurate, personalized medical advice that is easy to understand.
Always use clear, friendly language and avoid medical jargon.
Tailor your responses specifically to the user's details to ensure your advice is relevant to their situation. Keep in mind the following info about the user: 
Name: ${userInfo.name}, Gender: ${userInfo.gender}, Allergies: ${userInfo.allergies}, Diseases: ${userInfo.diseases}, Location: ${userInfo.location}. If possible
make use of all this data to create your responses. Give confident, brief, and succinct responses, like a doctor would.`
        }]
      });
    }

    // Add user message to history
    history.push({
      role: 'user',
      parts: [{ text: message }]
    });

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(message);
      const response = await result.response.text();

      // Add assistant response to history
      history.push({
        role: 'model',
        parts: [{ text: response }]
      });

      chatHistories.set(sessionId, history);

      res.status(200).json({ response });
    } catch (apiError) {
      console.error('Gemini API error:', apiError);
      if (API_KEY === "blank" || apiError.message.includes('API key')) {
        const placeholderResponse = `Hello ${userInfo.name}! I see you're ${userInfo.age} years old and from ${userInfo.location}. I've received your message: "${message}". (Note: Gemini API key needs to be configured)`;
        history.push({
          role: 'model',
          parts: [{ text: placeholderResponse }]
        });
        chatHistories.set(sessionId, history);
        return res.status(200).json({ response: placeholderResponse });
      }
      throw apiError;
    }
  } catch (error) {
    console.error('Error processing chat message:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Get user information (optional endpoint for debugging)
app.get('/api/user-info', (req, res) => {
  if (!userInfo) {
    return res.status(404).json({ error: 'User information not found' });
  }
  
  res.status(200).json(userInfo);
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
