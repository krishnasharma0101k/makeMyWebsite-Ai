import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/home";
import Dashboard from "./pages/Dashboard";
import GenerateWebsite from "./pages/GenerateWebsite";
import useGetCurrentUser from "./hooks/useGetCurrentUser";

export const serverUrl = "http://localhost:3000";

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
          element={userData ? <GenerateWebsite /> : <Navigate to={"/"}/>}
        />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;