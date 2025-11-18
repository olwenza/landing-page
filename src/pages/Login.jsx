import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { cognitoLogin } from "../api/cognitoAuth";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check auth state from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Redirect if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await cognitoLogin(username, password);
      const auth = response.data.AuthenticationResult;
      const idPayload = JSON.parse(atob(auth.IdToken.split(".")[1]));

      const loggedUser = {
        username: idPayload["cognito:username"],
        email: idPayload.email,
        tokens: auth,
      };

      // Save to Redux
      dispatch(login(loggedUser));

      // Also save to localStorage so reloads work
      localStorage.setItem("authUser", JSON.stringify(loggedUser));

      setLoading(false);
      // Redirect handled by useEffect
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your credentials and try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-b-2 border-gray-300 py-3 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b-2 border-gray-300 py-3 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg hover:from-indigo-600 hover:to-purple-600 shadow-lg transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-500 font-semibold hover:underline"
          >
            Sign Up
          </Link><br/>
          Forgot password?{" "}
          <Link
            to="/password-reset"
            className="text-indigo-500 font-semibold hover:underline"
          >
            Reset password
          </Link>
        </p>
      </div>
    </div>
  );
}
