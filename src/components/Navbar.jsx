import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate(); // ✅ Replaces useHistory()

  const handleLogout = () => {
    onLogout();
    navigate("/login"); // ✅ Redirect to login after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
        {!user ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/match">Match</Link>
            <Link to="/toss">Toss</Link>
            <Link to="/scoreboard">Score</Link>
            <Link to="/winner">Winner</Link>
            <Link to="/summaries">Match Summaries</Link>
          </>
        )}
      </div>

      {user && (
        <div className="navbar-right">
          <span className="navbar-user">
            👤 {user?.name || user?.email || "User"}
          </span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
