import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { eventsData } from '../data/mockData';
import './Landing.css';

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
      </svg>
    ),
    title: 'QR Check-In',
    desc: 'Streamlined on-site check-in with unique QR codes. No paper, no queues.',
    color: '#16A34A',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="7"/><polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
      </svg>
    ),
    title: 'Digital Certificates',
    desc: 'Auto-generated participation certificates delivered straight to attendees.',
    color: '#C2A36B',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'Live Analytics',
    desc: 'Real-time dashboards with registrations, revenue, and engagement data.',
    color: '#3B82F6',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Team & Committees',
    desc: 'Manage event committees, assign roles, and coordinate teams effortlessly.',
    color: '#A855F7',
  },
];

const STATS = [
  { value: '5,000+', label: 'Registrations', icon: '👥' },
  { value: '50+', label: 'Events Hosted', icon: '📅' },
  { value: '₹2Cr+', label: 'Revenue Processed', icon: '💰' },
  { value: '99.9%', label: 'Uptime SLA', icon: '🚀' },
];

const TESTIMONIALS = [
  {
    quote: "Altior transformed how we run Tech Summit. From 50 manual spreadsheets to a single dashboard — the difference is night and day.",
    name: "Dr. Priya Nair",
    role: "Conference Director, NASSCOM",
    avatar: "PN",
  },
  {
    quote: "The QR check-in feature alone saved us 2 hours of chaos on event day. Our team was blown away by how smooth it was.",
    name: "Arjun Bose",
    role: "Head of Events, IIT Bombay",
    avatar: "AB",
  },
  {
    quote: "Best-in-class UI and the analytics dashboard gave us insights we never had before. Highly recommend for any serious event organizer.",
    name: "Meera Kapoor",
    role: "Founder, DesignWeek India",
    avatar: "MK",
  },
];

export default function Landing() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const featuredEvents = eventsData.filter(e => e.featured).slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="landing page-enter">
      <Navbar />

      {/* ======================== HERO ======================== */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grid-pattern" />
          <div className="hero-gradient-1" />
          <div className="hero-gradient-2" />
        </div>

        <div className="container hero-content">
          <div className="hero-badge">
            <span className="badge badge-green">
              <span className="badge-dot" />
              New — Climate & Code Hackathon is live
            </span>
          </div>

          <h1 className="hero-title">
            Manage Events
            <br />
            <span className="gradient-text">Like Never Before</span>
          </h1>

          <p className="hero-subtitle">
            Altior is the premium event management platform built for modern organizations.
            From registration to analytics — everything in one place.
          </p>

          <div className="hero-actions">
            <Link to="/events" className="btn btn-primary btn-lg">
              Explore Events
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/admin/login" className="btn btn-outline btn-lg">
              Admin Dashboard
            </Link>
          </div>

          {/* Hero Stats */}
          <div className="hero-stats">
            {STATS.slice(0, 3).map(s => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat-value">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating event cards preview */}
        <div className="container">
          <div className="hero-cards-preview">
            {featuredEvents.map((event, i) => (
              <div
                key={event.id}
                className="hero-event-mini"
                style={{ '--delay': `${i * 0.1}s` }}
              >
                <div className="hero-event-mini-header" style={{ background: `${event.color}15` }}>
                  <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>{event.category}</span>
                </div>
                <div className="hero-event-mini-body">
                  <h4>{event.title}</h4>
                  <p>{event.city} · {new Date(event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</p>
                  <div className="hero-event-mini-footer">
                    <span style={{ color: 'var(--primary-light)', fontWeight: 700, fontSize: '0.85rem' }}>
                      {event.isFree ? 'Free' : `₹${event.price.toLocaleString()}`}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {event.capacity - event.registered} seats left
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== EVENTS ======================== */}
      <section className="landing-section upcoming-events">
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">Upcoming Events</p>
            <h2 className="section-title">Discover What's Next</h2>
            <p className="section-subtitle">
              Hand-picked events across technology, design, finance, and more. Register in minutes.
            </p>
          </div>

          <div className="events-grid">
            {eventsData.slice(0, 6).map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/events" className="btn btn-outline btn-lg">
              View All Events
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================== FEATURES ======================== */}
      <section className="landing-section features-section">
        <div className="container">
          <div className="section-header centered">
            <p className="section-eyebrow">Platform Features</p>
            <h2 className="section-title">Built for Modern Events</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Every feature you need to run seamless, professional events at any scale.
            </p>
          </div>

          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card">
                <div
                  className="feature-icon"
                  style={{ background: `${f.color}18`, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
                <div className="feature-link">Learn more →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== STATS ======================== */}
      <section className="landing-section trust-section">
        <div className="container">
          <div className="trust-inner">
            <div className="trust-left">
              <p className="section-eyebrow">Trusted by Indian Organizations</p>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>
                Numbers That Speak Volumes
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 400 }}>
                From college tech fests to corporate summits, Altior powers events of all scales across India.
              </p>
            </div>
            <div className="stats-grid">
              {STATS.map(s => (
                <div key={s.label} className="stat-box">
                  <span className="stat-emoji">{s.icon}</span>
                  <span className="stat-val">{s.value}</span>
                  <span className="stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================== TESTIMONIALS ======================== */}
      <section className="landing-section testimonials-section">
        <div className="container">
          <div className="section-header centered">
            <p className="section-eyebrow">Testimonials</p>
            <h2 className="section-title">What Organizers Say</h2>
          </div>

          <div className="testimonial-carousel">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`testimonial-card ${i === activeTestimonial ? 'active' : ''}`}
              >
                <div className="testimonial-quote-icon">"</div>
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="avatar" style={{ width: 40, height: 40 }}>{t.avatar}</div>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonial-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ======================== CTA ======================== */}
      <section className="landing-section cta-section">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-glow" />
            <h2 className="cta-title">Ready to Transform<br/>Your Events?</h2>
            <p className="cta-subtitle">
              Join 5,000+ attendees who've experienced the future of event management.
            </p>
            <div className="cta-actions">
              <Link to="/events" className="btn btn-primary btn-lg">
                Get Started Free
              </Link>
              <Link to="/admin/login" className="btn btn-outline btn-lg">
                View Admin Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
