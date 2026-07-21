import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/home";
import Dashboard from "./pages/Dashboard";
import GenerateWebsite from "./pages/GenerateWebsite";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import WebsiteEditor from "./pages/editor";
import LiveSite from "./pages/LiveSite";
import Pricing from "./pages/Pricing";

export const serverUrl = "https://makemywebsite-ai-backend.onrender.com";

function App() {
  useGetCurrentUser();

  const { userData } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={userData ? <Dashboard /> : <Home/>}
        />
        <Route
          path="/generateWebsite"
          element={userData ? <GenerateWebsite /> : <Home/>}
        />
        <Route
           path="/editor/:id"
            element={userData ? <WebsiteEditor /> : <Home />}
          />
          <Route path="/site/:id" element={<LiveSite />} />
          <Route path="pricing" element={<Pricing />} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;