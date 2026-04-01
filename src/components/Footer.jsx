import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/images/logo.webp" alt="Altior Logo" className="logo-img" style={{ height: '32px' }} />
              <span className="logo-text">Altior</span>
            </div>
            <p className="footer-tagline">
              Premium event management platform for modern organizations.
            </p>
            <div className="footer-social">
              {['Twitter', 'LinkedIn', 'GitHub'].map(s => (
                <a key={s} href="#" className="social-link">{s[0]}</a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-links-list">
              <li><Link to="/events">Browse Events</Link></li>
              <li><a href="#">For Organizers</a></li>
              <li><Link to="/admin/login">Admin Login</Link></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Features</h4>
            <ul className="footer-links-list">
              <li><a href="#">QR Check-in</a></li>
              <li><a href="#">Certificates</a></li>
              <li><a href="#">Analytics</a></li>
              <li><a href="#">Live Updates</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links-list">
              <li><Link to="/about">About</Link></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Altior. All rights reserved.</p>
          <p className="footer-credit">Built with ❤️ for event organizers</p>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          padding: var(--space-16) 0 var(--space-8);
          margin-top: auto;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: var(--space-10);
          margin-bottom: var(--space-10);
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
        }
        .footer-tagline {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: var(--space-5);
          max-width: 260px;
        }
        .footer-social {
          display: flex;
          gap: var(--space-2);
        }
        .social-link {
          width: 36px; height: 36px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-decoration: none;
          transition: var(--transition);
        }
        .social-link:hover {
          border-color: var(--primary);
          color: var(--primary-light);
          background: var(--primary-subtle);
        }
        .footer-col-title {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: var(--space-4);
        }
        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .footer-links-list a {
          font-size: 0.875rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: var(--transition);
        }
        .footer-links-list a:hover {
          color: var(--text-primary);
        }
        .footer-bottom {
          border-top: 1px solid var(--border);
          padding-top: var(--space-6);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: var(--space-8); }
          .footer-brand { grid-column: 1 / -1; }
          .footer-bottom { flex-direction: column; gap: var(--space-2); text-align: center; }
        }
      `}</style>
    </footer>
  );
}
