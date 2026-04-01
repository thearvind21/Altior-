import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">A</span>
          <span className="logo-text">Altior</span>
          <span className="logo-badge">EVENTS</span>
        </Link>

        {/* Nav Links */}
        <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          <Link to="/events" className="btn btn-primary btn-sm">
            Browse Events
          </Link>
          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${menuOpen ? 'x1' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'hide' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'x2' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
