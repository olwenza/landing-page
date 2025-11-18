import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cognitoSignUp } from "../api/cognitoAuth";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await cognitoSignUp(name, username, password, email.trim());
      console.log("Signup Success:", res.data);

      // Redirect to confirm page
      navigate("/confirm-signup", { state: { username } });

    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);

      setError(
        err.response?.data?.message ||
          "Signup failed. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center page-title">
          Create Account
        </h1>

        <form onSubmit={handleSignUp} className="space-y-6">

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Name */}
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-3 text-gray-900 placeholder-transparent"
            />
            <label className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-focus:top-0 peer-focus:text-indigo-500">
              Name
            </label>
          </div>

          {/* Username */}
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-3 text-gray-900 placeholder-transparent"
            />
            <label className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-focus:top-0 peer-focus:text-indigo-500">
              Username
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-3 text-gray-900 placeholder-transparent"
            />
            <label className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-focus:top-0 peer-focus:text-indigo-500">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-3 text-gray-900 placeholder-transparent"
            />
            <label className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-focus:top-0 peer-focus:text-indigo-500">
              Password
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg hover:from-indigo-600 hover:to-purple-600 shadow-lg transition flex items-center justify-center"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
