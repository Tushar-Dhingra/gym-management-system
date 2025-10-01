// src/components/Auth/LoginForm.jsx
import React, { useState } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import { toast } from 'react-toastify';

const LoginForm = ({ onSwitchToRegister, onForgotPassword, onLogin }) => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // API call would go here
      console.log("Login:", formData);
      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      localStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("isLoggedIn", "true");
      toast.success('Login successful!');
      onLogin();

    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-300">
          Sign in to continue your fitness journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-300">
            <input type="checkbox" className="mr-2 rounded" />
            Remember me
          </label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-blue-400 hover:text-blue-300"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full" onClick={handleSubmit}>
          Sign In
        </Button>

        <div className="text-center pt-4">
          <span className="text-gray-300">Don't have an account? </span>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
