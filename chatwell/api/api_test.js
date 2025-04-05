import { GoogleGenAI } from "@google/genai";


var name = "Rohan";
var age = 23;
var city = "New York";
var disease = "Diabetes";
const API_KEY = "AIzaSyDBnqclX6HR-tzjQgTh-F58ocdwXyDh2cw";
const ai = new GoogleGenAI({ apiKey: API_KEY });

var system_instruction = "You are a doctor. You will respond to the user in non-technical terms.\
Keep in mind these user info about the user to tailor your responses: Name: " + name + ", Age: " + age + ", City: " + city + ", Disease: " + disease + "."


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

