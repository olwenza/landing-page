// src/pages/ConfirmSignup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cognitoConfirmSignUp } from "../api/cognitoAuth";

export default function ConfirmSignup() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await cognitoConfirmSignUp(username.trim(), code.trim());
      setSuccess("Your account has been confirmed! Redirecting to dashboard...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Confirmation error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
        "Failed to confirm signup. Please check your code and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center page-title">
          Confirm Signup
        </h1>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

        <form onSubmit={handleConfirm} className="space-y-6">
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

          {/* Confirmation Code */}
          <div className="relative">
            <input
              type="text"
              id="code"
              placeholder=" "
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-3 text-gray-900 placeholder-transparent"
            />
            <label
              htmlFor="code"
              className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-indigo-500 peer-focus:text-sm"
            >
              Confirmation Code
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg hover:from-indigo-600 hover:to-purple-600 shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Confirming..." : "Confirm Signup"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already confirmed?{" "}
          <a href="/login" className="text-indigo-500 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
