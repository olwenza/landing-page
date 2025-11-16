import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600">
          MyApp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700">
          <Link className="hover:text-indigo-600 transition" to="/">
            Home
          </Link>

          <Link className="hover:text-indigo-600 transition" to="/about-us">
            About Us
          </Link>

          <Link className="hover:text-indigo-600 transition" to="/dashboard">
            Dashboard
          </Link>

          <Link className="hover:text-indigo-600 transition" to="/contact-us">
            Contact Us
          </Link>

          {!isAuthenticated ? (
            <Link
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              to="/login"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Welcome, <span className="font-medium">{user?.username}</span>
              </span>

              <button
                onClick={() => dispatch(logout())}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-inner px-6 py-4 space-y-4 text-gray-700">
          <Link
            className="block hover:text-indigo-600 transition"
            to="/"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <Link
            className="block hover:text-indigo-600 transition"
            to="/dashboard"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>

          {!isAuthenticated ? (
            <Link
              className="block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              to="/login"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          ) : (
            <>
              <span className="block text-gray-600">
                Welcome, {user?.username}
              </span>

              <button
                onClick={() => {
                  dispatch(logout());
                  setOpen(false);
                }}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
