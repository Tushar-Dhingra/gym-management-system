// src/components/Auth/AuthContainer.jsx
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const AuthContainer = ({ onLogin }) => {
  const [currentView, setCurrentView] = useState("login"); // 'login', 'register', 'forgot'

  const renderCurrentView = () => {
    switch (currentView) {
      case "register":
        return <RegisterForm onSwitchToLogin={() => setCurrentView("login")} />;
      case "forgot":
        return (
          <ForgotPasswordForm onBackToLogin={() => setCurrentView("login")} />
        );
      default:
        return (
          <LoginForm
            onSwitchToRegister={() => setCurrentView("register")}
            onForgotPassword={() => setCurrentView("forgot")}
            onLogin={onLogin}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">GymFit Pro</h1>
          <p className="text-gray-300">
            Streamline your gym operations with ease
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          {renderCurrentView()}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
