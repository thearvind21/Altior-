import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { eventsData, participantsData, formatCurrency, formatDate, getSeatsLeft } from '../../data/mockData';

const CATEGORY_COLORS = {
  Technology: '#16A34A', Design: '#C2A36B', Entrepreneurship: '#3B82F6',
  Finance: '#F59E0B', Hackathon: '#22C55E', Leadership: '#A855F7',
};

export default function AdminEvents() {
  const [collapsed, setCollapsed] = useState(false);
  const [view, setView] = useState('grid'); // grid | table
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...new Set(eventsData.map(e => e.category))];

  const filtered = eventsData.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = !search || e.title.toLowerCase().includes(q) || e.city.toLowerCase().includes(q);
    const matchCat = categoryFilter === 'All' || e.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main style={{ flex: 1, background: 'var(--bg-primary)', overflow: 'auto' }}>
        {/* Header */}
        <div style={{
          background: 'var(--surface)', borderBottom: '1px solid var(--border)',
          padding: 'var(--space-5) var(--space-8)', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 40,
        }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>Events</h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{eventsData.length} total events</p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', gap: 4, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', padding: 4 }}>
              {['grid', 'table'].map(v => (
                <button
                  key={v}
                  className={`btn btn-sm ${view === v ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setView(v)}
                  style={{ padding: '4px 12px' }}
                  id={`view-${v}`}
                >
                  {v === 'grid' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <button className="btn btn-primary btn-sm" id="add-event-btn">+ Add Event</button>
          </div>
        </div>

        <div style={{ padding: 'var(--space-6) var(--space-8)' }}>
          {/* Filters */}
          <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                id="admin-events-search"
                className="form-input"
                style={{ paddingLeft: 40 }}
                placeholder="Search events..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`btn btn-sm ${categoryFilter === cat ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ borderRadius: 'var(--radius-full)' }}
                  onClick={() => setCategoryFilter(cat)}
                  id={`admin-cat-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 'var(--space-4)' }}>
            {filtered.length} event{filtered.length !== 1 ? 's' : ''}
          </p>

          {view === 'grid' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 'var(--space-5)'
            }}>
              {filtered.map(event => {
                const seatsLeft = getSeatsLeft(event);
                const pct = (event.registered / event.capacity) * 100;
                const catColor = CATEGORY_COLORS[event.category] || '#16A34A';
                return (
                  <div key={event.id} style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)', overflow: 'hidden',
                    transition: 'all 0.2s ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    {/* Color bar */}
                    <div style={{ height: 4, background: catColor }} />
                    <div style={{ padding: 'var(--space-5)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                        <span className="badge badge-gray">{event.category}</span>
                        {event.featured && <span className="badge badge-gold">Featured</span>}
                      </div>
                      <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.3 }}>{event.title}</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
                        📅 {formatDate(event.date)} · 📍 {event.city}
                      </p>

                      {/* Progress */}
                      <div style={{ marginBottom: 'var(--space-4)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                          <span>{event.registered} registered</span>
                          <span style={{ color: seatsLeft < 20 ? 'var(--error)' : 'inherit' }}>{seatsLeft} left</span>
                        </div>
                        <div style={{ height: 4, background: 'var(--surface-elevated)', borderRadius: 4 }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: catColor, borderRadius: 4, transition: 'width 0.5s' }} />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                          {formatCurrency(event.price)}
                        </span>
                        <Link
                          to={`/admin/events/${event.id}`}
                          className="btn btn-outline btn-sm"
                          id={`admin-event-${event.id}`}
                        >
                          Manage →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>City</th>
                    <th>Registrations</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(event => (
                    <tr key={event.id}>
                      <td>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{event.title}</p>
                          {event.featured && <span className="badge badge-gold" style={{ fontSize: '0.65rem', marginTop: 4 }}>Featured</span>}
                        </div>
                      </td>
                      <td>
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 600,
                          color: CATEGORY_COLORS[event.category] || '#fff',
                          background: `${CATEGORY_COLORS[event.category]}18`,
                          padding: '3px 10px', borderRadius: 'var(--radius-full)',
                          border: `1px solid ${CATEGORY_COLORS[event.category]}30`
                        }}>
                          {event.category}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{formatDate(event.date)}</td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{event.city}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 50, height: 4, background: 'var(--surface-elevated)', borderRadius: 4 }}>
                            <div style={{ width: `${(event.registered / event.capacity) * 100}%`, height: '100%', background: CATEGORY_COLORS[event.category], borderRadius: 4 }} />
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{event.registered}/{event.capacity}</span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{formatCurrency(event.price)}</td>
                      <td><span className="badge badge-green">Active</span></td>
                      <td>
                        <Link to={`/admin/events/${event.id}`} className="btn btn-outline btn-sm" id={`admin-event-tbl-${event.id}`}>
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
