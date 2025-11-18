// src/pages/Login.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { mockLoginAPI } from "../features/auth/authAPI";
import { useNavigate } from "react-router-dom";

import cognitoLogin from "../api/cognitoAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState(""); // <-- error state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous error

    try {
      //const user = await mockLoginAPI(username, password); /** MockLogin */
      const response = await cognitoLogin(username, password);
      console.log("Auth Success:", response.data);

      const auth = response.data.AuthenticationResult;
      const idPayload = JSON.parse(atob(auth.IdToken.split('.')[1]));

      const user = {
        username: idPayload["cognito:username"],
        email: idPayload.email,
        tokens: auth
      };

      // Save user/tokens to Redux
      dispatch(login(user));

      //redirect to dashboard
      // Redirect to dashboard on success
      navigate("/dashboard");

    } catch (err) {
      console.error("Cognito Login Error:", err.response?.data || err.message);
      // Show friendly error message
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          {/* Username */}
          <div className="relative">
            <input
              type="text"
              id="username"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-3 text-gray-900 placeholder-transparent"
            />
            <label
              htmlFor="username"
              className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-indigo-500 peer-focus:text-sm"
            >
              Username
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-3 text-gray-900 placeholder-transparent"
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-indigo-500 peer-focus:text-sm"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg hover:from-indigo-600 hover:to-purple-600 shadow-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-500 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
