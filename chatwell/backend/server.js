const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Set up GoogleGenAI client with your API Key
const API_KEY = "AIzaSyDBnqclX6HR-tzjQgTh-F58ocdwXyDh2cw";
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Define user information
const name = "Rohan";
const age = 23;
const city = "New York";
const disease = "Diabetes";

// Set up system instructions for the AI
const system_instruction = `You are a doctor. You will respond to the user in non-technical terms. Keep in mind these user info about the user to tailor your responses: Name: ${name}, Age: ${age}, City: ${city}, Disease: ${disease}.`;

// Endpoint to get a health improvement response
app.post('/health-improvement', async (req, res) => {
  const { query } = req.body; // Expecting a "query" from the request body

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    // Generate AI response using the GoogleGenAI API
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: query,
      config: {
        systemInstruction: system_instruction,
      },
    });

    // Return the AI's response as JSON
    return res.json({ response: response.text });
  } catch (error) {
    console.error("Error with AI response:", error);
    return res.status(500).json({ error: 'Error generating response from AI' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
