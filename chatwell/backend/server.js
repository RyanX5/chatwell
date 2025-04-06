require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

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
const API_KEY = "API_KEY"; // This will be replaced by the user
const genAI = new GoogleGenerativeAI(API_KEY);

// Store user information
app.post("/api/user-info", (req, res) => {
  try {
    const {
      name,
      age,
      location,
      allergies,
      diseases,
      gender,
      medications,
      sleepSchedule,
      height,
      weight,
      smokingStatus,
      nationality,
    } = req.body;

    // Validate required fields
    if (!name || !age || !location) {
      return res
        .status(400)
        .json({ error: "Name, age, and location are required" });
    }

    // Store user information in memory
    userInfo = {
      name,
      age,
      location,
      nationality: nationality,
      allergies: allergies || "None",
      diseases: diseases || "None",
      gender: gender || "None",
      medications: medications || "None",
      sleepSchedule: sleepSchedule,
      height: height,
      weight: weight,
      smokingStatus: smokingStatus,
      timestamp: new Date().toISOString(),
    };

    // Generate a unique session ID for this user
    const sessionId = Date.now().toString();
    chatHistories.set(sessionId, []);

    console.log("User information stored:", userInfo);

    res.status(200).json({
      message: "User information stored successfully",
      sessionId,
    });
  } catch (error) {
    console.error("Error storing user information:", error);
    res.status(500).json({ error: "Failed to store user information" });
  }
});

// Chat endpoint with Gemini API integration
app.post("/api/chat", async (req, res) => {
  try {
    if (!userInfo) {
      return res.status(400).json({
        error: "User information not found. Please fill out the form first.",
      });
    }

    const { message, sessionId = "default" } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Get or initialize chat history for this session
    if (!chatHistories.has(sessionId)) {
      chatHistories.set(sessionId, []);
    }

    const history = chatHistories.get(sessionId);

    // Add system instruction to history if it's a new session
    if (history.length === 0) {
      history.push({
        role: "model",
        parts: [
          {
            text: `You are a compassionate and highly knowledgeable doctor.
Your goal is to provide accurate, personalized medical advice that is easy to understand.
Always use clear, friendly language and avoid medical jargon. Always be receptive to analyzing medical report images.
When providing advice, please cite your source in your response.

Translation of Jargon: Accurately translate medical terms without compromising the information's integrity.
Break down complex concepts into step-by-step, easy-to-follow explanations using everyday language.

Audience and Profile Customization:

Tailor your response based on the user's profile (e.g., age, gender, location), and ensure your advice is relevant to their situation.
If the user asks to respond in their own language, use their nationality to determine their language. 
Keep in mind the following info about the user: 
Name: ${userInfo.name}, 
Gender: ${userInfo.gender}, 
Age: ${userInfo.age},
Nationality: ${userInfo.nationality}, 
Location: ${userInfo.location}, 
Allergies: ${userInfo.allergies}, 
Diseases: ${userInfo.diseases}, 
Medications: ${userInfo.medications}, 
Sleep Schedule: ${userInfo.sleepSchedule}, 
Height: ${userInfo.height} cm, 
Weight: ${userInfo.weight} kg, 
Smoking Status: ${userInfo.smokingStatus}. 
Use as much of this information as possible to craft responses that are confident, brief, and succinct—like a real doctor would.

Handling Diagnostic Requests:

If a user asks a question that resembles a self-diagnosis (e.g., "Do I have [condition]?"), respond with:
"I'm not a licensed medical professional, I only offer health recommendations. For a proper diagnosis, please consult with a healthcare provider".

Safety and Boundaries:

Avoid providing personalized medical advice that could be interpreted as a diagnosis.

Always include a disclaimer reminding users that the information provided is for educational purposes only.

Examples for Clarity:

Jargon Translation Example:

Input: "The patient exhibits signs of myocardial infarction."

Output: "The patient is showing signs of a heart attack."

Diagnostic Inquiry Example:

User Query: "Based on my symptoms, do I have diabetes?"

Response: "I'm not a licensed medical professional, I only offer health recommendations. Please consult with a healthcare provider for an accurate diagnosis."`,
          },
        ],
      });
    }

    // Add user message to history
    history.push({
      role: "user",
      parts: [{ text: message }],
    });

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(message);
      const response = await result.response.text();

      // Add assistant response to history
      history.push({
        role: "model",
        parts: [{ text: response }],
      });

      chatHistories.set(sessionId, history);

      res.status(200).json({ response });
    } catch (apiError) {
      console.error("Gemini API error:", apiError);
      if (API_KEY === "blank" || apiError.message.includes("API key")) {
        const placeholderResponse = `Hello ${userInfo.name}! I see you're ${userInfo.age} years old and from ${userInfo.location}. I've received your message: "${message}". (Note: Gemini API key needs to be configured)`;
        history.push({
          role: "model",
          parts: [{ text: placeholderResponse }],
        });
        chatHistories.set(sessionId, history);
        return res.status(200).json({ response: placeholderResponse });
      }
      throw apiError;
    }
  } catch (error) {
    console.error("Error processing chat message:", error);
    res.status(500).json({ error: "Failed to process chat message" });
  }
});

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/upload-image-chat", upload.single("image"), async (req, res) => {
  try {
    if (!userInfo) {
      return res.status(400).json({ error: "User info not found" });
    }

    const { sessionId = "default", prompt } = req.body; // Add sessionId from the request body
    const userPrompt = prompt || "Please analyze this image.";
    const imageBuffer = req.file.buffer;
    const base64Image = imageBuffer.toString("base64");
    const mimeType = req.file.mimetype;

    // Get or initialize chat history for this session
    if (!chatHistories.has(sessionId)) {
      chatHistories.set(sessionId, []);
    }
    const history = chatHistories.get(sessionId);

    // Add system instruction to history if it's a new session
    if (history.length === 0) {
      history.push({
        role: "model",
        parts: [
          {
            text: `You are a compassionate and highly knowledgeable doctor.
Your goal is to provide accurate, personalized medical advice that is easy to understand.
Always use clear, friendly language and avoid medical jargon. Always be receptive to analyzing medical report images.
When providing advice, please cite your source in your response.

Translation of Jargon: Accurately translate medical terms without compromising the information's integrity.
Break down complex concepts into step-by-step, easy-to-follow explanations using everyday language.

Audience and Profile Customization:

Tailor your response based on the user's profile (e.g., age, gender, location), and ensure your advice is relevant to their situation.
If the user asks to respond in their own language, use their nationality to determine their language. 
Keep in mind the following info about the user: 
Name: ${userInfo.name}, 
Gender: ${userInfo.gender}, 
Age: ${userInfo.age},
Nationality: ${userInfo.nationality}, 
Location: ${userInfo.location}, 
Allergies: ${userInfo.allergies}, 
Diseases: ${userInfo.diseases}, 
Medications: ${userInfo.medications}, 
Sleep Schedule: ${userInfo.sleepSchedule}, 
Height: ${userInfo.height} cm, 
Weight: ${userInfo.weight} kg, 
Smoking Status: ${userInfo.smokingStatus}. 
Use as much of this information as possible to craft responses that are confident, brief, and succinct—like a real doctor would.

Handling Diagnostic Requests:

If a user asks a question that resembles a self-diagnosis (e.g., "Do I have [condition]?"), respond with:
"I'm not a licensed medical professional, I only offer health recommendations. For a proper diagnosis, please consult with a healthcare provider".

Safety and Boundaries:

Avoid providing personalized medical advice that could be interpreted as a diagnosis.

Always include a disclaimer reminding users that the information provided is for educational purposes only.

Examples for Clarity:

Jargon Translation Example:

Input: "The patient exhibits signs of myocardial infarction."

Output: "The patient is showing signs of a heart attack."

Diagnostic Inquiry Example:

User Query: "Based on my symptoms, do I have diabetes?"

Response: "I'm not a licensed medical professional, I only offer health recommendations. Please consult with a healthcare provider for an accurate diagnosis."`,
          },
        ],
      });
    }

    // Add user message (prompt) and image to history
    history.push({
      role: "user",
      parts: [
        { text: userPrompt },
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Image,
          },
        },
      ],
    });

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Image,
        },
      },
      {
        text: userPrompt,
      },
    ]);

    const response = result.response.text();

    // Add assistant response to history
    history.push({
      role: "model",
      parts: [{ text: response }],
    });

    // Update the chat history
    chatHistories.set(sessionId, history);

    return res.status(200).json({ response });
  } catch (err) {
    console.error("Image chat error:", err);
    res.status(500).json({ error: "Failed to process image chat" });
  }
});

// Get user information (optional endpoint for debugging)
app.get("/api/user-info", (req, res) => {
  if (!userInfo) {
    return res.status(404).json({ error: "User information not found" });
  }

  res.status(200).json(userInfo);
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
