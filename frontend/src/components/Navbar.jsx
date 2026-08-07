import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useToast } from "../context/ToastContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { pushToast } = useToast();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    pushToast("Logged out successfully");
    closeMenu();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/" className="brand" onClick={closeMenu}>
          <i className="fa-solid fa-hotel" />
          <span>Vilasta</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="nav-links">
          <Link to="/">Explore</Link>

          {user && (
            <Link to="/listings/new">
              Add new listing
            </Link>
          )}
        </nav>

        {/* Desktop actions */}
        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-user">
                @{user.username}
              </span>

              <button
                className="btn-link"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="nav-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <i
            className={
              menuOpen
                ? "fa-solid fa-xmark"
                : "fa-solid fa-bars"
            }
          />
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="nav-mobile">
          <Link to="/" onClick={closeMenu}>
            Explore
          </Link>

          {user && (
            <Link
              to="/listings/new"
              onClick={closeMenu}
            >
              Add new listing
            </Link>
          )}

          {user ? (
            <>
              <span className="nav-user">
                @{user.username}
              </span>

              <button
                className="btn-link"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" onClick={closeMenu}>
                Signup
              </Link>

              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}