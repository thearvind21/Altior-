import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { eventsData, participantsData, transactionsData, getKPIs, revenueChartData, registrationBreakdown, activityFeed, formatCurrency } from '../../data/mockData';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const KPI_CONFIG = [
  {
    key: 'totalRevenue',
    label: 'Total Revenue',
    color: '#16A34A',
    bgColor: 'rgba(22,163,74,0.1)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    format: (v) => formatCurrency(v),
    trend: '+85.2%',
    trendUp: true,
  },
  {
    key: 'totalRegistrations',
    label: 'Total Registrations',
    color: '#3B82F6',
    bgColor: 'rgba(59,130,246,0.1)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    format: (v) => v.toLocaleString(),
    trend: '+75.5%',
    trendUp: true,
  },
  {
    key: 'totalEvents',
    label: 'Active Events',
    color: '#C2A36B',
    bgColor: 'rgba(194,163,107,0.1)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    format: (v) => v,
    trend: '+2 this month',
    trendUp: true,
  },
  {
    key: 'avgConversion',
    label: 'Conversion Rate',
    color: '#A855F7',
    bgColor: 'rgba(168,85,247,0.1)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" />
      </svg>
    ),
    format: (v) => `${v}%`,
    trend: '+65%',
    trendUp: true,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--surface-elevated)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '10px 14px', fontSize: '0.8rem'
    }}>
      <p style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || 'var(--text-primary)', fontWeight: 700 }}>
          {p.name}: {p.name === 'revenue' ? formatCurrency(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const kpis = getKPIs();

  const pendingCount = participantsData.filter(p => p.status === 'pending').length;
  const confirmedCount = participantsData.filter(p => p.status === 'confirmed').length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main style={{ flex: 1, background: 'var(--bg-primary)', overflow: 'auto' }}>
        {/* Top bar */}
        <div style={{
          background: 'var(--surface)', borderBottom: '1px solid var(--border)',
          padding: 'var(--space-5) var(--space-8)', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 40,
        }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Dashboard
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              April 1, 2026 · Welcome back, Admin
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            {pendingCount > 0 && (
              <div style={{
                background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)',
                borderRadius: 'var(--radius)', padding: '6px 12px',
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: '0.8rem', color: '#FCD34D',
              }}>
                <span>⚠</span>
                {pendingCount} pending approvals
              </div>
            )}
            <Link to="/admin/events" className="btn btn-primary btn-sm">+ New Event</Link>
          </div>
        </div>

        <div style={{ padding: 'var(--space-8)' }}>
          {/* KPI Cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--space-5)', marginBottom: 'var(--space-8)'
          }}>
            {KPI_CONFIG.map(kpi => (
              <div key={kpi.key} className="stat-card" id={`kpi-${kpi.key}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div
                    className="stat-card-icon"
                    style={{ background: kpi.bgColor, color: kpi.color }}
                  >
                    {kpi.icon}
                  </div>
                  <span className={`stat-card-trend ${kpi.trendUp ? 'trend-up' : 'trend-down'}`}>
                    {kpi.trendUp ? '↑' : '↓'} {kpi.trend}
                  </span>
                </div>
                <div>
                  <div className="stat-card-value">{kpi.format(kpis[kpi.key])}</div>
                  <div className="stat-card-label">{kpi.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            {/* Revenue Chart */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: 'var(--space-6)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
                <div>
                  <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>Revenue Overview</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last 6 months</p>
                </div>
                <span className="badge badge-green">+18.2% MoM</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueChartData}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16A34A" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#16A34A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" name="revenue" stroke="#16A34A" strokeWidth={2} fill="url(#revenueGrad)" dot={{ fill: '#16A34A', r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: 'var(--space-6)',
            }}>
              <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem', marginBottom: 4 }}>
                Registrations by Event
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
                Distribution
              </p>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={registrationBreakdown}
                    cx="50%" cy="50%"
                    innerRadius={40} outerRadius={70}
                    dataKey="value"
                    stroke="none"
                  >
                    {registrationBreakdown.map((entry, index) => (
                      <Cell key={index} fill={entry.color} opacity={0.9} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {registrationBreakdown.map(item => (
                  <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            {/* Registration Bar Chart */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: 'var(--space-6)',
            }}>
              <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem', marginBottom: 4 }}>
                Monthly Registrations
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
                Last 6 months
              </p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={revenueChartData} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="registrations" name="registrations" fill="#3B82F6" radius={[4, 4, 0, 0]} opacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Activity Feed */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: 'var(--space-6)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
                <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>
                  Activity Feed
                </h3>
                <span className="badge badge-green">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', animation: 'pulse 2s infinite' }} />
                  Live
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {activityFeed.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                    <div className="avatar" style={{ width: 32, height: 32, fontSize: '0.7rem', flexShrink: 0 }}>
                      {item.avatar}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                        {item.message}
                      </p>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.time}</span>
                    </div>
                    <div style={{
                      width: 6, height: 6, borderRadius: '50%', flexShrink: 0, marginTop: 6,
                      background: item.type === 'payment' ? 'var(--success)'
                        : item.type === 'cancellation' ? 'var(--error)'
                          : item.type === 'event' ? 'var(--gold)'
                            : '#3B82F6',
                    }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Events Quick View */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', marginTop: 'var(--space-6)', overflow: 'hidden'
          }}>
            <div style={{
              padding: 'var(--space-5) var(--space-6)',
              borderBottom: '1px solid var(--border)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>
                Events Overview
              </h3>
              <Link to="/admin/events" className="btn btn-ghost btn-sm">View All →</Link>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>City</th>
                  <th>Registrations</th>
                  <th>Revenue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {eventsData.slice(0, 4).map(event => {
                  const rev = participantsData
                    .filter(p => p.eventId === event.id && p.payment === 'paid')
                    .reduce((s, p) => s + p.amount, 0);
                  return (
                    <tr key={event.id}>
                      <td>
                        <Link to={`/admin/events/${event.id}`} style={{
                          color: 'var(--text-primary)', fontWeight: 600,
                          fontSize: '0.875rem', textDecoration: 'none'
                        }}>
                          {event.title}
                        </Link>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{event.city}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ flex: 1, height: 4, background: 'var(--surface-elevated)', borderRadius: 4, maxWidth: 60 }}>
                            <div style={{ width: `${(event.registered / event.capacity) * 100}%`, height: '100%', background: event.color, borderRadius: 4 }} />
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{event.registered}/{event.capacity}</span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.875rem' }}>{formatCurrency(rev)}</td>
                      <td><span className="badge badge-green">Active</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
