// src/App.js
import React, { useEffect, useState } from "react";
import AuthContainer from "./components/Auth/AuthContainer";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedLayout from "./components/Layout/ProtectedLayout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ColdStartModal from "./components/Modals/ColdStartModal";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showColdStart, setShowColdStart] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("isLoggedIn");
    const storedUserData = localStorage.getItem("userData");
    const hasSeenColdStart = localStorage.getItem("hasSeenColdStart");

    if (!hasSeenColdStart) {
      setShowColdStart(true);
    }

    if (token && storedUserData) {
      setIsLogin(true);
      setUserData(JSON.parse(storedUserData));
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleCloseColdStart = () => {
    setShowColdStart(false);
    localStorage.setItem("hasSeenColdStart", "true");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    setIsLogin(false);
    setUserData(null);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthContainer onLogin={() => setIsLogin(true)} />
            )
          }
        />

        <Route
          path="/*"
          element={
            isLogin ? (
              <ProtectedLayout onLogout={handleLogout} userData={userData} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ColdStartModal
        isOpen={showColdStart}
        onClose={handleCloseColdStart}
      />
    </div>
  );
}
