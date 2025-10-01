// src/App.js
import React, { useEffect, useState } from "react";
import AuthContainer from "./components/Auth/AuthContainer";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedLayout from "./components/Layout/ProtectedLayout";
import { ToastContainer } from 'react-toastify';

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("isLoggedIn");
    setIsLogin(false);
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
              <ProtectedLayout onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
      <ToastContainer position="top-right" />
    </div>
  );
}
