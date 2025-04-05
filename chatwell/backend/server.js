const { GoogleGenAI } = require('@google/genai');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyDBnqclX6HR-tzjQgTh-F58ocdwXyDh2cw";
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Endpoint to handle the healthcare form submission
app.post('/submit-form', async (req, res) => {
  const { name, age, gender, conditions, allergies, exercise, diet, sleep, currentConditions, goals, preferredWorkouts } = req.body;

  // Check if the required fields are present
  if (!name || !age || !gender || !conditions) {
    return res.status(400).json({ error: 'Name, Age, Gender, and Conditions are required' });
  }

  const resp = `You are a compassionate and highly knowledgeable doctor. \
Your goal is to provide accurate, personalized medical advice that is easy to understand. \
Always use clear, friendly language and avoid medical jargon. \
Tailor your responses specifically to the user's details to ensure your advice is relevant to their situation. \
Know these information about the user: Name: ${name}, age: ${age}, gender: ${gender}, allergies: ${allergies}, conditions: ${conditions}, exercise: ${exercise}, diet: ${diet}, sleep: ${sleep}, current conditions: ${currentConditions}, goals: ${goals}, preferred workouts: ${preferredWorkouts}.`;

  try {
    let response = await main(resp);
    const final_response = {
      message: response
    };
    return res.json(final_response);
  } catch (error) {
    console.error('Error during AI response generation:', error);
    return res.status(500).json({ error: 'Error generating response from AI' });
  }
});

// Function to handle the AI model generation
async function main(resp) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash", // Choose the right model
    contents: "Hello",  // Use the personalized prompt
    config: {
      systemInstruction: resp,
    },
  });
  
  console.log(response.text);
  return response.text;  // Return the response text from the AI
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
