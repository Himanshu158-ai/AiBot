import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const ChatInterface = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { botName, personality, language } = location.state;
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("https://aibot-546k.onrender.com/doubts", {
        input,
        personality,
        language,
        botName,
      });

      setResponse(res.data);
    } catch (err) {
      setResponse("⚠️ Oops! Something went wrong: " + err.message);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-gray-100 overflow-x-hidden overflow-y-auto">

      {/* Header */}
      <div className="p-4 sm:p-6 bg-gray-800/70 border-b border-gray-700 text-center text-lg sm:text-xl font-semibold shadow-md">
        Learn with {botName} 🤖
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 justify-center items-center p-6">
        {/* Loader */}
        {loading && (
          <Loader/>
        )}

        {/* Response Box */}
        {!loading && response && (
          <div className="w-full max-w-5xl mb-6 px-4 py-3 bg-gray-700 rounded-xl text-gray-100 wrap-break-word shadow-md transition-all duration-300 overflow-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-gray-800 px-1 py-0.5 rounded">
                      {children}
                    </code>
                  );
                },
              }}
            >
              {response}
            </ReactMarkdown>
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-lg"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-3 rounded-lg shadow-md font-semibold transition-transform duration-300 ${loading
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-linear-to-r from-blue-600 to-purple-600 text-white hover:scale-105"
              }`}
          >
            {loading ? "..." : "Ask →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
