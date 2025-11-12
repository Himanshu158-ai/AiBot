// File: CustomizeBot.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomizeBot = () => {
  const [botName, setBotName] = useState("");
  const [personality, setPersonality] = useState("");
  const [language, setLanguage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ botName, personality, language });
    alert("Your AI bot has been customized successfully! 🤖");
    const botData = {
      botName,
      personality,
      language
    }

    // Navigate to chat page after customization
    navigate("/chat",{ state: botData });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-gray-100 p-4 sm:p-6 relative overflow-hidden">

      {/* Glowing orbs */}
      <div className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-purple-600/20 rounded-full blur-3xl -top-8 -left-8 sm:top-10 sm:left-10 animate-pulse"></div>
      <div className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-blue-600/20 rounded-full blur-3xl -bottom-8 -right-8 sm:bottom-10 sm:right-10 animate-pulse"></div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Customize Your AI Bot
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4 sm:space-y-6 border border-gray-700"
      >
        {/* Bot Name */}
        <div>
          <label className="block text-sm font-medium mb-1 sm:mb-2 text-gray-300">
            Bot Name
          </label>
          <input
            type="text"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            placeholder="Enter your bot's name"
            className="w-full px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
          />
        </div>

        {/* Personality */}
        <div>
          <label className="block text-sm font-medium mb-1 sm:mb-2 text-gray-300">
            Personality / Tone
          </label>
          <input
            type="text"
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            placeholder="e.g. Friendly, Professional, Funny..."
            className="w-full px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 placeholder-gray-500"
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium mb-1 sm:mb-2 text-gray-300">
            Language
          </label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="e.g. Hindi, English Neon..."
            className="w-full px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 sm:py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
        >
          Save & Continue →
        </button>
      </form>
    </div>
  );
};

export default CustomizeBot;
