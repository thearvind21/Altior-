import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { eventsData, participantsData, transactionsData, formatCurrency, formatDate, getSeatsLeft } from '../../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DAYS_DATA = [
  { day: 'Mar 10', regs: 3 }, { day: 'Mar 11', regs: 5 }, { day: 'Mar 12', regs: 2 },
  { day: 'Mar 13', regs: 8 }, { day: 'Mar 14', regs: 4 }, { day: 'Mar 15', regs: 11 },
  { day: 'Mar 16', regs: 7 }, { day: 'Mar 17', regs: 6 }, { day: 'Mar 18', regs: 9 },
  { day: 'Mar 19', regs: 14 }, { day: 'Mar 20', regs: 12 }, { day: 'Mar 21', regs: 10 },
];

export default function AdminEventDetail() {
  const { id } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const event = eventsData.find(e => e.id === id);

  if (!event) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main style={{ flex: 1, background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="empty-state">
            <h3 style={{ color: 'var(--text-primary)' }}>Event not found</h3>
            <Link to="/admin/events" className="btn btn-primary">Back to Events</Link>
          </div>
        </main>
      </div>
    );
  }

  const eventParticipants = participantsData.filter(p => p.eventId === id);
  const confirmedCount = eventParticipants.filter(p => p.status === 'confirmed').length;
  const revenue = eventParticipants.filter(p => p.payment === 'paid').reduce((s, p) => s + p.amount, 0);
  const seatsLeft = getSeatsLeft(event);
  const fillPct = (event.registered / event.capacity) * 100;

  const eventColor = event.color || '#16A34A';

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
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <Link to="/admin/events" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Events
            </Link>
            <span style={{ color: 'var(--text-muted)' }}>›</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {event.title}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Link to={`/events/${event.id}`} target="_blank" className="btn btn-outline btn-sm">
              View Public Page →
            </Link>
            <button className="btn btn-primary btn-sm" id="edit-event-btn">Edit Event</button>
          </div>
        </div>

        <div style={{ padding: 'var(--space-8)' }}>
          {/* Event Banner */}
          <div style={{
            background: `linear-gradient(135deg, ${eventColor}20, ${eventColor}06)`,
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-8)',
            marginBottom: 'var(--space-6)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: -80, right: -80,
              width: 300, height: 300,
              background: `radial-gradient(circle, ${eventColor}25, transparent 70%)`,
              pointerEvents: 'none',
            }} />
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <span className="badge badge-gray">{event.category}</span>
              {event.featured && <span className="badge badge-gold">⭐ Featured</span>}
              <span className="badge badge-green">Active</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
              {event.title}
            </h2>
            <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
              {[
                { label: '📅', value: formatDate(event.date) },
                { label: '🕐', value: event.time },
                { label: '📍', value: `${event.venue}, ${event.city}` },
              ].map(m => (
                <span key={m.label} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', gap: 6 }}>
                  {m.label} {m.value}
                </span>
              ))}
            </div>
          </div>

          {/* KPI Row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--space-4)', marginBottom: 'var(--space-6)'
          }}>
            {[
              { label: 'Total Revenue', value: formatCurrency(revenue), color: '#16A34A', icon: '💰' },
              { label: 'Confirmed', value: confirmedCount, color: '#3B82F6', icon: '✅' },
              { label: 'Capacity', value: `${Math.round(fillPct)}% filled`, color: eventColor, icon: '📊' },
              { label: 'Seats Left', value: seatsLeft, color: seatsLeft < 20 ? '#EF4444' : '#22C55E', icon: '💺' },
            ].map(k => (
              <div key={k.label} className="stat-card">
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem' }}>{k.icon}</span>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>{k.label}</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: k.color }}>{k.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Registration Chart */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', padding: 'var(--space-6)',
            marginBottom: 'var(--space-6)',
          }}>
            <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Daily Registrations</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 'var(--space-5)' }}>Last 12 days</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={DAYS_DATA}>
                <defs>
                  <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={eventColor} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={eventColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="regs" name="Registrations" stroke={eventColor} strokeWidth={2} fill="url(#regGrad)" dot={{ fill: eventColor, r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            {/* Committees */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', overflow: 'hidden',
            }}>
              <div style={{ padding: 'var(--space-5)', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>Committees</h3>
              </div>
              {event.committees.map((c, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: 'var(--space-4) var(--space-5)',
                  borderBottom: i < event.committees.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{c.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Head: {c.head}</p>
                  </div>
                  <span className="badge badge-blue">{c.members} members</span>
                </div>
              ))}
            </div>

            {/* Recent Participants */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', overflow: 'hidden',
            }}>
              <div style={{
                padding: 'var(--space-5)', borderBottom: '1px solid var(--border)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>Recent Registrations</h3>
                <Link to="/admin/participants" className="btn btn-ghost btn-sm" id="view-participants-link">View All →</Link>
              </div>
              {eventParticipants.length === 0 ? (
                <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  No registrations yet
                </div>
              ) : (
                eventParticipants.slice(0, 5).map((p, i) => (
                  <div key={p.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: 'var(--space-4) var(--space-5)',
                    borderBottom: i < Math.min(eventParticipants.length, 5) - 1 ? '1px solid var(--border)' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <div className="avatar" style={{ width: 32, height: 32, fontSize: '0.7rem' }}>
                        {p.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</p>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{p.committee}</p>
                      </div>
                    </div>
                    <span className={`badge ${p.status === 'confirmed' ? 'badge-green' : p.status === 'cancelled' ? 'badge-red' : 'badge-yellow'}`}>
                      {p.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
