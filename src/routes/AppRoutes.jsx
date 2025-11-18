// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Dashboard from "../pages/Dashboard";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import SignUp from "../pages/SignUp";
import ConfirmSignup from "../pages/ConfirmSignup";
import PasswordReset from "../pages/PasswordReset";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/confirm-signup" element={<ConfirmSignup />} />
      <Route path="/password-reset" element={<PasswordReset />} />

    </Routes>
  );
}
