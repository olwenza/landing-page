// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Build <span className="text-yellow-300">Amazing Apps</span> with Ease
          </h1>
          <p className="text-lg md:text-xl mb-8 text-indigo-100">
            Fast, modern, and responsive layouts powered by React & TailwindCSS.
          </p>
          <Link
            to="/dashboard"
            className="inline-block px-8 py-3 bg-yellow-300 text-indigo-900 font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transform transition">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">Fast</h3>
            <p className="text-gray-600">
              Lightning-fast performance with optimized React components.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transform transition">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">Responsive</h3>
            <p className="text-gray-600">
              Fully responsive layouts that look perfect on any device.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transform transition">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">Easy to Use</h3>
            <p className="text-gray-600">
              Simple, clean UI components that speed up your development.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
