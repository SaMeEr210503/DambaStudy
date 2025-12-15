import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/courses", label: "Courses" },
    { path: "/categories", label: "Categories" },
    { path: "/dashboard", label: "Dashboard", protected: true },
    { path: "/certificates", label: "Certificates", protected: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          DambaStudy
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav">
          {navLinks.map((link) => {
            if (link.protected && !user) return null;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${isActive(link.path) ? "active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="navbar-actions">
          {/* Search */}
          <SearchBar placeholder="Search courses..." />

          {/* Cart */}
          <Link to="/cart" className="navbar-cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartItems.length > 0 && (
              <span className="navbar-cart-badge">{cartItems.length}</span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="navbar-profile">
                <span className="navbar-avatar">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </span>
                <span className="navbar-username">{user.name}</span>
              </Link>
              <button onClick={logout} className="navbar-btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-btn-secondary">
                Login
              </Link>
              <Link to="/register" className="navbar-btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu">
          {navLinks.map((link) => {
            if (link.protected && !user) return null;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="navbar-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          {!user && (
            <>
              <Link
                to="/login"
                className="navbar-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="navbar-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(20, 20, 22, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .navbar-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
        }

        .navbar-nav {
          display: flex;
          gap: 0.5rem;
        }

        .navbar-link {
          padding: 0.5rem 1rem;
          color: #d1d1d1;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }

        .navbar-link:hover {
          color: #f5f5f5;
          background: rgba(255, 255, 255, 0.05);
        }

        .navbar-link.active {
          color: #a855f7;
          background: rgba(168, 85, 247, 0.1);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .navbar-cart {
          position: relative;
          padding: 0.5rem;
          color: #d1d1d1;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }

        .navbar-cart:hover {
          color: #f5f5f5;
          background: rgba(255, 255, 255, 0.05);
        }

        .navbar-cart-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 18px;
          height: 18px;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          border-radius: 50%;
          font-size: 0.7rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .navbar-profile {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.75rem 0.25rem 0.25rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .navbar-profile:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .navbar-avatar {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: white;
        }

        .navbar-username {
          color: #d1d1d1;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .navbar-btn-secondary {
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #d1d1d1;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 0.5rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: none;
        }

        .navbar-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.25);
          color: #f5f5f5;
          transform: none;
        }

        .navbar-btn-primary {
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #a855f7, #9333ea);
          border: none;
          color: white;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 0.5rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
        }

        .navbar-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(168, 85, 247, 0.4);
        }

        .navbar-mobile-toggle {
          display: none;
          padding: 0.5rem;
          background: transparent;
          border: none;
          color: #d1d1d1;
          cursor: pointer;
          box-shadow: none;
        }

        .navbar-mobile-toggle:hover {
          transform: none;
        }

        .navbar-mobile-menu {
          display: none;
          padding: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .navbar-mobile-link {
          display: block;
          padding: 0.75rem 1rem;
          color: #d1d1d1;
          text-decoration: none;
          font-size: 1rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }

        .navbar-mobile-link:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #f5f5f5;
        }

        @media (max-width: 768px) {
          .navbar-nav,
          .navbar-actions {
            display: none;
          }

          .navbar-mobile-toggle {
            display: block;
          }

          .navbar-mobile-menu {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
