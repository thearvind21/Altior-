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
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: var(--transition-slow);
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .event-card:hover {
          border-color: var(--border-light);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        }
        .event-card-header {
          position: relative;
          padding: var(--space-6);
          min-height: 140px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .event-card-glow {
          position: absolute;
          top: -30px; right: -30px;
          width: 100px; height: 100px;
          border-radius: 50%;
          opacity: 0.08;
          filter: blur(20px);
        }
        .event-card-pattern {
          position: absolute;
          right: -10px; top: -10px;
          opacity: 0.6;
        }
        .event-card-top {
          display: flex;
          gap: var(--space-2);
          margin-bottom: var(--space-3);
          position: relative;
          z-index: 1;
        }
        .event-card-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
          position: relative;
          z-index: 1;
        }
        .event-card-body {
          padding: var(--space-5);
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          flex: 1;
        }
        .event-meta {
          display: flex;
          gap: var(--space-4);
        }
        .event-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .event-card-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .event-capacity {}
        .event-capacity-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--space-2);
        }
        .capacity-bar {
          height: 4px;
          background: var(--surface-elevated);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .capacity-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.5s ease;
        }
        .event-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .event-price {
          display: flex;
          flex-direction: column;
        }
        .price-free {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--success);
        }
        .price-amount {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .price-label {
          font-size: 0.7rem;
          color: var(--text-muted);
        }
        .event-card-link {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-light);
          text-decoration: none;
          transition: var(--transition);
        }
        .event-card-link:hover {
          color: var(--gold);
        }
      `}</style>
    </div>
  );
}
