import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeInterface from './components/Home'
import CustomizeBot from './components/CostomizeBot'
import ChatInterface from './components/BotInterface'

export const App = () => {
  return (
    // <>
    <Router>
      <Routes>
        <Route path="/" element={<HomeInterface />} />
        <Route path="/customize" element={<CustomizeBot />} />
        <Route path="/chat" element={<ChatInterface />} />
      </Routes>
    </Router>
    // {/* </> */ }
  )
}
