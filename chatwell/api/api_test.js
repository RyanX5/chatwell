import { GoogleGenAI } from "@google/genai";


var name = "Rohan";
var age = 23;
var city = "New York";
var country = "USA"
var disease = "Diabetes";
var gender = "male"
var lifestyle = "sedentary"
var hobbies = "walking"
var goals = "lose weight"

const API_KEY = "AIzaSyDBnqclX6HR-tzjQgTh-F58ocdwXyDh2cw";
const ai = new GoogleGenAI({ apiKey: API_KEY });

var system_instruction = "You are a compassionate and highly knowledgeable doctor. \
Your goal is to provide accurate, personalized medical advice that is easy to understand. \
Always use clear, friendly language and avoid medical jargon. \
Tailor your responses specifically to the user's details to ensure your advice is relevant to their situation. \
Keep in mind the user's age (" + age + "), location (" + city + ", " + country + "), and gender (" + gender + "), \
Address user by their name (" + name + ") when responding. \
Explain any medical concepts in simple terms. When offering recommendations to help improve their health, make sure they are \
practical, easy-to-follow, tailored to the user details (age, location, gender), and keep in mind their \
lifestyle (" + lifestyle + "), goals (" + goals + "), and hobbies (" + hobbies + "),";
// Main prompting function
async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Can you tell me about ways to improve my health?",
    config: {
      systemInstruction: system_instruction,
    },
  });
  console.log(response.text);
}

