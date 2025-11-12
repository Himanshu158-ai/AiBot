const dotenv = require('dotenv');
dotenv.config();
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
async function main(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [{ text: prompt }]
        });
        return response.text;
    } catch (error) {
        return "Sorry, AI service is not available right now 😞";
    }
}
module.exports = main;