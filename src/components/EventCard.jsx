import { Link } from 'react-router-dom';
import { formatCurrency, formatDate, getSeatsLeft } from '../data/mockData';

const CATEGORY_COLORS = {
  Technology: '#16A34A',
  Design: '#C2A36B',
  Entrepreneurship: '#3B82F6',
  Finance: '#F59E0B',
  Hackathon: '#22C55E',
  Leadership: '#A855F7',
};

export default function EventCard({ event, variant = 'default' }) {
  const seatsLeft = getSeatsLeft(event);
  const fillPercent = (event.registered / event.capacity) * 100;
  const catColor = CATEGORY_COLORS[event.category] || '#16A34A';

  return (
    <div className={`event-card ${variant}`}>
      {/* Header visual */}
      <div
        className="event-card-header"
        style={{ background: `linear-gradient(135deg, ${catColor}18, ${catColor}06)` }}
      >
        <div className="event-card-glow" style={{ background: catColor }} />
        <div className="event-card-top">
          <span className="badge badge-gray">{event.category}</span>
          {event.featured && (
            <span className="badge badge-gold">Featured</span>
          )}
        </div>
        {/* Abstract pattern */}
        <div className="event-card-pattern">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="40" stroke={catColor} strokeOpacity="0.2" strokeWidth="1" />
            <circle cx="60" cy="60" r="60" stroke={catColor} strokeOpacity="0.1" strokeWidth="1" />
            <circle cx="60" cy="60" r="20" fill={catColor} fillOpacity="0.1" />
          </svg>
        </div>
        <h3 className="event-card-title">{event.title}</h3>
      </div>

      {/* Body */}
      <div className="event-card-body">
        {/* Meta info */}
        <div className="event-meta">
          <div className="event-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="event-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span>{event.city}</span>
          </div>
        </div>

        {/* Description */}
        <p className="event-card-desc">{event.description.slice(0, 90)}...</p>

        {/* Progress */}
        <div className="event-capacity">
          <div className="event-capacity-info">
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {event.registered} / {event.capacity} registered
            </span>
            <span className="text-sm" style={{ color: seatsLeft < 30 ? 'var(--error)' : 'var(--text-secondary)' }}>
              {seatsLeft} left
            </span>
          </div>
          <div className="capacity-bar">
            <div
              className="capacity-fill"
              style={{
                width: `${fillPercent}%`,
                background: fillPercent > 90 ? '#EF4444' : fillPercent > 70 ? '#F59E0B' : catColor
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="event-card-footer">
          <div className="event-price">
            {event.isFree ? (
              <span className="price-free">Free</span>
            ) : (
              <>
                <span className="price-amount">{formatCurrency(event.price)}</span>
                <span className="price-label">per person</span>
              </>
            )}
          </div>
          <Link to={`/register/${event.id}`} className="btn btn-primary btn-sm">
            Register
          </Link>
        </div>

        {/* CTA */}
        <Link to={`/events/${event.id}`} className="event-card-link">
          View Details →
        </Link>
      </div>

      <style>{`
        .event-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          transition: var(--transition-slow);
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .event-card:hover {
          border-color: var(--border-light);
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
        }
        .event-card-header {
          position: relative;
          padding: var(--space-6);
          min-height: 140px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: var(--space-2);
        }
        @media (min-width: 768px) {
          .event-card-header {
            padding: var(--space-8);
            min-height: 160px;
          }
        }
        .event-card-glow {
          position: absolute;
          top: -40px; right: -40px;
          width: 120px; height: 120px;
          border-radius: 50%;
          opacity: 0.1;
          filter: blur(30px);
        }
        .event-card-pattern {
          position: absolute;
          right: -20px; top: -20px;
          opacity: 0.4;
        }
        .event-card-top {
          display: flex;
          gap: var(--space-2);
          position: absolute;
          top: var(--space-5);
          left: var(--space-5);
          z-index: 1;
        }
        @media (min-width: 768px) {
          .event-card-top {
            top: var(--space-6);
            left: var(--space-6);
          }
        }
        .event-card-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
          position: relative;
          z-index: 1;
          letter-spacing: -0.01em;
        }
        @media (min-width: 768px) {
          .event-card-title {
            font-size: var(--text-2xl);
            letter-spacing: -0.02em;
          }
        }
        .event-card-body {
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
          flex: 1;
        }
        @media (min-width: 768px) {
          .event-card-body {
            padding: var(--space-8);
            gap: var(--space-6);
          }
        }
        .event-meta {
          display: flex;
          gap: var(--space-4);
          flex-wrap: wrap;
        }
        @media (min-width: 768px) {
          .event-meta {
            gap: var(--space-6);
          }
        }
        .event-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: var(--text-sm);
          color: var(--text-secondary);
          font-weight: 500;
        }
        .event-card-desc {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: 1.6;
        }
        .event-capacity {}
        .event-capacity-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--space-3);
        }
        .capacity-bar {
          height: 6px;
          background: var(--surface-elevated);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .capacity-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .event-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-2);
        }
        .event-price {
          display: flex;
          flex-direction: column;
        }
        .price-free {
          font-size: var(--text-xl);
          font-weight: 800;
          color: var(--success);
        }
        .price-amount {
          font-size: var(--text-xl);
          font-weight: 800;
          color: var(--text-primary);
        }
        .price-label {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .event-card-link {
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--primary-light);
          text-decoration: none;
          transition: var(--transition);
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .event-card-link:hover {
          color: var(--gold-light);
          gap: 8px;
        }
      `}</style>
    </div>
  );
}
