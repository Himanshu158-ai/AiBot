import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const SERVER_URI =
  import.meta.env.VITE_SERVER_URI || "http://localhost:5000/doubts";

const ChatInterface = () => {
  const location = useLocation();
  const { botName, personality, language } = location.state;
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // 👇 Debugging: log only after chatHistory updates
  useEffect(() => {
    console.log("📜 Updated Chat History:", chatHistory);
  }, [chatHistory]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    // Temporary chat object
    const newChatData = { prompt: input, response: null };
    const updatedHistory = [...chatHistory, newChatData];

    try {
      const res = await axios.post(`${SERVER_URI}`, {
        input,
        personality,
        language,
        botName,
        chatHistory: updatedHistory, // send current updated history
      });

      const responseData = res.data;
      updatedHistory[updatedHistory.length - 1].response = responseData;

      // ✅ Correct: set updated array, not string
      setChatHistory(updatedHistory);
      setResponse(responseData);

      console.log(`🤖 Personality: ${personality}`);
      console.log(`🗣️ Language: ${language}`);
    } catch (err) {
      setResponse("⚠️ Oops! Something went wrong: " + err.message);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 overflow-x-hidden overflow-y-auto">
      {/* Header */}
      <div className="p-4 sm:p-6 bg-gray-800/70 border-b border-gray-700 text-center text-lg sm:text-xl font-semibold shadow-md">
        Learn with {botName} 🤖
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 justify-center items-center p-6">
        {loading && <Loader />}

        {/* Display Chat History */}
        <div className="w-full max-w-5xl space-y-4 mb-6 overflow-auto">
          {chatHistory.map((chat, idx) => (
            <div key={idx}>
              <div className="mb-2 text-blue-400 font-semibold">
                You: {chat.prompt}
              </div>
              <div className="px-4 py-3 bg-gray-700 rounded-xl shadow-md">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ inline, className, children, ...props }) {
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
                  {chat.response}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

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
            className={`px-4 py-3 rounded-lg shadow-md font-semibold transition-transform duration-300 ${
              loading
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105"
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
