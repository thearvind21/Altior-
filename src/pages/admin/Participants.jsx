import { useState, useMemo } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { participantsData, eventsData } from '../../data/mockData';
import { Link } from 'react-router-dom';

const STATUS_BADGE = {
  confirmed: 'badge-green',
  pending: 'badge-yellow',
  cancelled: 'badge-red',
};

const PAYMENT_BADGE = {
  paid: 'badge-green',
  pending: 'badge-yellow',
  refunded: 'badge-gray',
  free: 'badge-blue',
};

export default function Participants() {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [eventFilter, setEventFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');

  const eventTitles = ['All', ...new Set(participantsData.map(p => p.eventTitle))];

  const filtered = useMemo(() => {
    return participantsData.filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !search || p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || p.college.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchEvent = eventFilter === 'All' || p.eventTitle === eventFilter;
      const matchPayment = paymentFilter === 'All' || p.payment === paymentFilter;
      return matchSearch && matchStatus && matchEvent && matchPayment;
    });
  }, [search, statusFilter, eventFilter, paymentFilter]);

  const totalRevenue = participantsData
    .filter(p => p.payment === 'paid')
    .reduce((s, p) => s + p.amount, 0);

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
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Participants
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {participantsData.length} total registrations
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button className="btn btn-outline btn-sm" id="export-csv-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        <div style={{ padding: 'var(--space-6) var(--space-8)' }}>
          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            {[
              { label: 'Total', value: participantsData.length, color: 'var(--text-primary)' },
              { label: 'Confirmed', value: participantsData.filter(p => p.status === 'confirmed').length, color: 'var(--success)' },
              { label: 'Pending', value: participantsData.filter(p => p.status === 'pending').length, color: '#FCD34D' },
              { label: 'Cancelled', value: participantsData.filter(p => p.status === 'cancelled').length, color: 'var(--error)' },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-5)', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                id="participants-search"
                className="form-input"
                style={{ paddingLeft: 40 }}
                placeholder="Search by name, email, college..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Event filter */}
            <select
              id="participants-event-filter"
              className="form-select"
              style={{ width: 'auto' }}
              value={eventFilter}
              onChange={e => setEventFilter(e.target.value)}
            >
              {eventTitles.map(t => <option key={t} value={t}>{t === 'All' ? 'All Events' : t}</option>)}
            </select>

            {/* Status pills */}
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {['All', 'confirmed', 'pending', 'cancelled'].map(s => (
                <button
                  key={s}
                  className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ borderRadius: 'var(--radius-full)', textTransform: 'capitalize' }}
                  onClick={() => setStatusFilter(s)}
                  id={`status-filter-${s}`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Payment filter */}
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {['All', 'paid', 'pending', 'free', 'refunded'].map(p => (
                <button
                  key={p}
                  className={`btn btn-sm ${paymentFilter === p ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ borderRadius: 'var(--radius-full)', textTransform: 'capitalize' }}
                  onClick={() => setPaymentFilter(p)}
                  id={`payment-filter-${p}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 'var(--space-3)' }}>
            Showing {filtered.length} of {participantsData.length} participants
          </p>

          {/* Table */}
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Participant</th>
                  <th>Event</th>
                  <th>Committee</th>
                  <th>College/Org</th>
                  <th>Ticket ID</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div className="avatar" style={{ width: 32, height: 32, fontSize: '0.7rem', flexShrink: 0 }}>
                          {p.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{p.name}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Link to={`/admin/events/${p.eventId}`} style={{
                        fontSize: '0.8rem', color: 'var(--primary-light)', textDecoration: 'none',
                        fontWeight: 500
                      }}>
                        {p.eventTitle.length > 22 ? p.eventTitle.slice(0, 22) + '…' : p.eventTitle}
                      </Link>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{p.committee}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{p.college}</td>
                    <td>
                      <code style={{
                        background: 'var(--surface-elevated)', padding: '2px 8px',
                        borderRadius: 4, fontSize: '0.7rem', color: 'var(--text-secondary)'
                      }}>
                        {p.ticketId}
                      </code>
                    </td>
                    <td><span className={`badge ${STATUS_BADGE[p.status]}`}>{p.status}</span></td>
                    <td><span className={`badge ${PAYMENT_BADGE[p.payment]}`}>{p.payment}</span></td>
                    <td style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      {p.amount === 0 ? 'Free' : `₹${p.amount.toLocaleString()}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="empty-state" style={{ paddingTop: 'var(--space-12)' }}>
              <div className="empty-state-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700 }}>No participants found</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Try adjusting your filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
