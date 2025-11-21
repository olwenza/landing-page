// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="sticky top-0 z-50 shadow bg-white">
          <Navbar />
        </header>

        <main className="max-w-6xl mx-auto px-6 py-8">
          <AppRoutes />
        </main>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
