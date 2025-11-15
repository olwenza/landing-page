import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav style={{ padding: 10, background: "#eee", marginBottom: 20 }}>
      <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> |{" "}
      {!isAuthenticated ? (
        <Link to="/login">Login</Link>
      ) : (
        <>
          <span>Welcome, {user?.username}</span>{" "}
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      )}
    </nav>
  );
}
