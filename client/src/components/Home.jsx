// File: HomeInterface.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const HomeInterface = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-gray-100 relative overflow-hidden px-4 sm:px-6">

      {/* Glowing background orbs */}
      <div className="absolute w-56 h-56 sm:w-72 sm:h-72 bg-blue-600/30 rounded-full blur-3xl top-10 -left-16 sm:left-10 animate-pulse"></div>
      <div className="absolute w-56 h-56 sm:w-72 sm:h-72 bg-purple-600/30 rounded-full blur-3xl bottom-10 -right-16 sm:right-10 animate-pulse"></div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-center sm:text-left">
        🤖 AI Bot Creator
      </h1>

      {/* Tagline */}
      <p className="text-gray-400 mb-8 text-center max-w-md text-base sm:text-lg">
        Ready to build your <span className="text-blue-400 font-semibold">personalized AI bot</span>?
      </p>

      {/* Continue Button */}
      <button
        onClick={() => navigate("/customize")}
        className="px-6 sm:px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105"
      >
        Continue →
      </button>

      {/* Footer */}
      <p className="text-xs text-gray-600 absolute bottom-5 text-center w-full">
        Powered by AI ⚡
      </p>
    </div>
  );
};

export default HomeInterface;
