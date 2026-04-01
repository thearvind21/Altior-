import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.error);
      }
    }, 800);
  };

  const fillDemo = () => {
    setEmail('admin@altior.com');
    setPassword('123456');
    setError('');
  };

  return (
    <div className="page-enter" style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 60% 60% at 20% 50%, rgba(22,163,74,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 80% 20%, rgba(194,163,107,0.05) 0%, transparent 60%)
        `,
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(31,41,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(31,41,55,0.3) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      }} />

      <div style={{
        width: '100%',
        maxWidth: 440,
        padding: 'var(--space-6)',
        position: 'relative',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            textDecoration: 'none', marginBottom: 'var(--space-6)'
          }}>
            <div style={{
              width: 40, height: 40, background: 'var(--primary)',
              borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', color: '#fff'
            }}>A</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--text-primary)' }}>
              Altior
            </span>
          </Link>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800,
            color: 'var(--text-primary)', marginBottom: 8
          }}>
            Admin Login
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)',
        }}>
          {/* Demo credentials notice */}
          <div style={{
            background: 'var(--primary-subtle)', border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius)', padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)', display: 'flex', gap: 10, alignItems: 'flex-start'
          }}>
            <span style={{ color: 'var(--primary-light)', fontSize: '1rem', flexShrink: 0 }}>💡</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--text-primary)' }}>Demo credentials:</strong><br />
                Email: admin@altior.com<br />
                Password: 123456
              </p>
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={fillDemo}
              style={{ flexShrink: 0, fontSize: '0.75rem' }}
              id="fill-demo-btn"
            >
              Fill
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                id="login-email"
                type="email"
                className="form-input"
                placeholder="admin@altior.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  required
                  style={{ paddingRight: '44px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
                    padding: 4, display: 'flex',
                  }}
                  id="toggle-password"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPass
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    }
                  </svg>
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 'var(--radius)', padding: 'var(--space-3) var(--space-4)',
                display: 'flex', alignItems: 'center', gap: 8
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span style={{ fontSize: '0.85rem', color: '#FCA5A5' }}>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              id="login-submit"
              style={{ width: '100%', justifyContent: 'center', padding: 'var(--space-4)', fontSize: '1rem', marginTop: 4 }}
            >
              {loading ? (
                <><div className="spinner" /> Signing in...</>
              ) : (
                <>Sign In to Dashboard</>
              )}
            </button>
          </form>
        </div>

        {/* Back link */}
        <p style={{ textAlign: 'center', marginTop: 'var(--space-5)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>
            ← Back to Public Site
          </Link>
        </p>
      </div>
    </div>
  );
}
