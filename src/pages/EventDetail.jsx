import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { eventsData, formatCurrency, formatDate, getSeatsLeft } from '../data/mockData';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventsData.find(e => e.id === id);

  if (!event) {
    return (
      <div className="page-enter">
        <Navbar />
        <div className="empty-state" style={{ minHeight: '60vh' }}>
          <div className="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h3 style={{ color: 'var(--text-primary)' }}>Event not found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>This event may have been removed or doesn't exist.</p>
          <Link to="/events" className="btn btn-primary">Browse Events</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const seatsLeft = getSeatsLeft(event);
  const fillPct = (event.registered / event.capacity) * 100;

  return (
    <div className="page-enter">
      <Navbar />

      {/* Hero Banner */}
      <div style={{
        background: `linear-gradient(180deg, ${event.color}18 0%, var(--bg-primary) 100%)`,
        borderBottom: '1px solid var(--border)',
        padding: 'var(--space-16) 0 var(--space-10)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', top: -100, right: -100,
          width: 400, height: 400,
          background: `radial-gradient(circle, ${event.color}20, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 'var(--space-5)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link to="/events" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Events</Link>
            <span>›</span>
            <span style={{ color: 'var(--text-secondary)' }}>{event.title}</span>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
            <span className="badge badge-gray">{event.category}</span>
            {event.featured && <span className="badge badge-gold">⭐ Featured</span>}
            {event.isFree && <span className="badge badge-green">FREE</span>}
            {event.certificateProvided && <span className="badge badge-blue">🏆 Certificate</span>}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-4)',
            maxWidth: 700,
          }}>
            {event.title}
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 600, lineHeight: 1.7 }}>
            {event.description}
          </p>

          {/* Event Meta Row */}
          <div style={{
            display: 'flex', gap: 'var(--space-6)', marginTop: 'var(--space-6)',
            flexWrap: 'wrap'
          }}>
            {[
              { icon: '📅', label: 'Date', value: formatDate(event.date) + (event.date !== event.endDate ? ` – ${formatDate(event.endDate)}` : '') },
              { icon: '🕐', label: 'Time', value: event.time },
              { icon: '📍', label: 'Venue', value: `${event.venue}, ${event.city}` },
              { icon: '💺', label: 'Capacity', value: `${event.registered}/${event.capacity}` },
            ].map(m => (
              <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.1rem' }}>{m.icon}</span>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{m.label}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>{m.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ padding: 'var(--space-10) var(--space-6)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-8)', alignItems: 'start' }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            
            {/* About */}
            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>About This Event</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{event.longDescription}</p>
            </section>

            {/* Agenda */}
            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 'var(--space-5)', color: 'var(--text-primary)' }}>Agenda</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {event.agenda.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start',
                    padding: 'var(--space-4)', background: 'var(--surface)',
                    border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                  }}>
                    <div style={{
                      background: `${event.color}18`, color: event.color,
                      borderRadius: 'var(--radius-sm)', padding: '4px 10px',
                      fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      {item.time}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{item.title}</p>
                      {item.speaker && <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 2 }}>{item.speaker}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Committees */}
            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 'var(--space-5)', color: 'var(--text-primary)' }}>Committees</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
                {event.committees.map((c, i) => (
                  <div key={i} style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)', padding: 'var(--space-4)',
                  }}>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{c.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>Head: {c.head}</p>
                    <p style={{ fontSize: '0.75rem', color: event.color, marginTop: 4, fontWeight: 600 }}>{c.members} members</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Speakers */}
            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 'var(--space-5)', color: 'var(--text-primary)' }}>Speakers</h2>
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                {event.speakers.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)', padding: 'var(--space-4)',
                    minWidth: 200,
                  }}>
                    <div className="avatar" style={{ width: 44, height: 44, fontSize: '0.85rem' }}>{s.avatar}</div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{s.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {event.tags.map(tag => (
                <span key={tag} className="badge badge-gray"># {tag}</span>
              ))}
            </div>
          </div>

          {/* Right — Registration Card (sticky) */}
          <div style={{ position: 'sticky', top: 'calc(64px + 20px)' }}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
            }}>
              {/* Price header */}
              <div style={{
                background: `linear-gradient(135deg, ${event.color}20, ${event.color}08)`,
                borderBottom: '1px solid var(--border)',
                padding: 'var(--space-6)',
              }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Registration</p>
                <p style={{
                  fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900,
                  color: event.isFree ? 'var(--success)' : 'var(--text-primary)',
                  marginTop: 4,
                }}>
                  {formatCurrency(event.price)}
                </p>
                {!event.isFree && <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 2 }}>per participant</p>}
              </div>

              {/* Details */}
              <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Seats */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span>{event.registered} registered</span>
                    <span style={{ color: seatsLeft < 30 ? 'var(--error)' : 'var(--text-secondary)' }}>
                      {seatsLeft} seats left
                    </span>
                  </div>
                  <div style={{ height: 6, background: 'var(--surface-elevated)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${fillPct}%`,
                      background: fillPct > 90 ? '#EF4444' : event.color,
                      borderRadius: 'var(--radius-full)', transition: 'width 0.5s ease'
                    }} />
                  </div>
                </div>

                {/* Features */}
                {[
                  event.certificateProvided && '🏆 Certificate of Participation',
                  event.qrCheckIn && '📱 QR Code Check-In',
                  event.liveUpdates && '🔔 Live Event Updates',
                ].filter(Boolean).map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span>{f}</span>
                  </div>
                ))}

                <Link
                  to={`/register/${event.id}`}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: 'var(--space-4)', fontSize: '1rem' }}
                  id="register-cta-btn"
                >
                  Register Now
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                  Secure registration · Instant confirmation
                </p>
              </div>
            </div>

            {/* Share box */}
            <div style={{
              marginTop: 'var(--space-4)', background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              padding: 'var(--space-4)', display: 'flex',
              alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Share Event</span>
              <div style={{ display: 'flex', gap: 8 }}>
                {['𝕏', 'in', '🔗'].map((icon, i) => (
                  <button key={i} className="btn-icon" style={{ fontSize: '0.75rem', width: 32, height: 32 }}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
