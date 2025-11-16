// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center">
        {/* Brand */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-white">MyApp</h2>
          <p className="text-gray-400 mt-1">Building amazing apps with TailwindCSS</p>
        </div>

        {/* Links */}
        <div className="flex space-x-6 mb-6 md:mb-0">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
          <Link to="/login" className="hover:text-white transition">Login</Link>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white transition"><FaTwitter /></a>
          <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-white transition"><FaInstagram /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-900 text-gray-500 text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
}
