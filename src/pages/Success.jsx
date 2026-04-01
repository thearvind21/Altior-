import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { formatDate, formatCurrency } from '../data/mockData';

export default function Success() {
  const location = useLocation();
  const { event, participant } = location.state || {};

  if (!event || !participant) {
    return (
      <div className="page-enter">
        <Navbar />
        <div className="empty-state" style={{ minHeight: '70vh' }}>
          <h3 style={{ color: 'var(--text-primary)' }}>No registration data found</h3>
          <Link to="/events" className="btn btn-primary">Browse Events</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-enter">
      <Navbar />

      <div style={{
        minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'var(--space-16) var(--space-6)',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* BG glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(22,163,74,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: 640, width: '100%', position: 'relative',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-6)'
        }}>
          {/* Success Icon */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(34, 197, 94, 0.12)',
              border: '2px solid rgba(34, 197, 94, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto var(--space-5)',
              animation: 'scaleIn 0.5s ease',
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900,
              color: 'var(--text-primary)', marginBottom: 'var(--space-3)'
            }}>
              You're Registered! 🎉
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>
              Your spot at <strong style={{ color: 'var(--text-primary)' }}>{event.title}</strong> is confirmed.
              A confirmation email has been sent to <strong style={{ color: 'var(--primary-light)' }}>{participant.email}</strong>
            </p>
          </div>

          {/* Ticket Card */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          }}>
            {/* Ticket Header */}
            <div style={{
              background: `linear-gradient(135deg, ${event.color}25, ${event.color}08)`,
              borderBottom: '1px solid var(--border)',
              padding: 'var(--space-6)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
            }}>
              <div>
                <span className="badge badge-green" style={{ marginBottom: 10 }}>✓ Confirmed</span>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem',
                  color: 'var(--text-primary)', lineHeight: 1.3
                }}>
                  {event.title}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 6 }}>
                  {formatDate(event.date)} · {event.time}
                </p>
              </div>

              {/* QR Code mock */}
              <div style={{
                width: 72, height: 72, background: 'var(--surface-elevated)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: 4, flexShrink: 0,
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" strokeWidth="1.5">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                  <path d="M14 14h2v2h-2z"/><path d="M16 16h2v2h-2z"/><path d="M14 18h2v2h-2z"/>
                </svg>
                <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>QR CODE</span>
              </div>
            </div>

            {/* Dashed divider (ticket cutline) */}
            <div style={{
              borderTop: '2px dashed var(--border)',
              margin: '0 var(--space-6)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', left: -30, top: -8,
                width: 16, height: 16, borderRadius: '50%',
                background: 'var(--bg-primary)',
              }} />
              <div style={{
                position: 'absolute', right: -30, top: -8,
                width: 16, height: 16, borderRadius: '50%',
                background: 'var(--bg-primary)',
              }} />
            </div>

            {/* Ticket Details */}
            <div style={{ padding: 'var(--space-5) var(--space-6)' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: 'var(--space-4)'
              }}>
                {[
                  { label: 'Participant', value: participant.name },
                  { label: 'Ticket ID', value: participant.ticketId },
                  { label: 'Email', value: participant.email },
                  { label: 'Committee', value: participant.committee },
                  { label: 'Venue', value: `${event.city}` },
                  { label: 'Amount Paid', value: formatCurrency(event.price) },
                ].map(row => (
                  <div key={row.label}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                      {row.label}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 600, wordBreak: 'break-all' }}>
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
            gap: 'var(--space-4)'
          }}>
            {[
              { icon: '📧', label: 'Check your email', sub: 'Confirmation sent' },
              { icon: '📱', label: 'Save QR code', sub: 'For entry check-in' },
              { icon: '🔔', label: 'Get reminders', sub: 'Live event updates' },
            ].map(f => (
              <div key={f.label} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', padding: 'var(--space-4)',
                textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 6
              }}>
                <span style={{ fontSize: '1.5rem' }}>{f.icon}</span>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>{f.label}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.sub}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => window.print()}
              id="download-ticket"
            >
              Download Ticket
            </button>
            <Link to="/events" className="btn btn-outline btn-lg">
              Browse More Events
            </Link>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
