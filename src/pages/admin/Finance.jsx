import { useState, useMemo } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { transactionsData, formatCurrency } from '../../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MONTHLY_REVENUE = [
  { month: 'Oct', revenue: 12400 }, { month: 'Nov', revenue: 18900 },
  { month: 'Dec', revenue: 15200 }, { month: 'Jan', revenue: 24500 },
  { month: 'Feb', revenue: 31200 }, { month: 'Mar', revenue: 28700 },
];

const METHOD_DATA = [
  { method: 'UPI', amount: 5996, count: 5 },
  { method: 'Card', amount: 9796, count: 5 },
  { method: 'NetBanking', amount: 5298, count: 2 },
];

const STATUS_BADGE = {
  success: 'badge-green',
  pending: 'badge-yellow',
  refunded: 'badge-gray',
  failed: 'badge-red',
};

export default function Finance() {
  const [collapsed, setCollapsed] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const totalRevenue = transactionsData.filter(t => t.status === 'success').reduce((s, t) => s + t.amount, 0);
  const pendingAmount = transactionsData.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0);
  const refundedAmount = Math.abs(transactionsData.filter(t => t.status === 'refunded').reduce((s, t) => s + t.amount, 0));
  const successCount = transactionsData.filter(t => t.status === 'success').length;

  const filtered = useMemo(() => {
    return transactionsData.filter(t => {
      const q = search.toLowerCase();
      const matchSearch = !search || t.name.toLowerCase().includes(q) || t.event.toLowerCase().includes(q) || t.txnRef.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'All' || t.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

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
              Finance
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{transactionsData.length} total transactions</p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button className="btn btn-outline btn-sm" id="finance-export-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export Report
            </button>
          </div>
        </div>

        <div style={{ padding: 'var(--space-8)' }}>
          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            {[
              {
                label: 'Confirmed Revenue', value: formatCurrency(totalRevenue), color: '#16A34A',
                icon: '💰', bg: 'rgba(22,163,74,0.1)', sub: `from ${successCount} transactions`
              },
              {
                label: 'Pending Amount', value: formatCurrency(pendingAmount), color: '#F59E0B',
                icon: '⏳', bg: 'rgba(245,158,11,0.1)', sub: 'Awaiting clearance'
              },
              {
                label: 'Total Refunded', value: formatCurrency(refundedAmount), color: '#EF4444',
                icon: '↩️', bg: 'rgba(239,68,68,0.1)', sub: '1 cancellation'
              },
              {
                label: 'Net Revenue', value: formatCurrency(totalRevenue - refundedAmount), color: '#C2A36B',
                icon: '📈', bg: 'rgba(194,163,107,0.1)', sub: 'After refunds'
              },
            ].map(k => (
              <div key={k.label} className="stat-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 'var(--radius)',
                  background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', marginBottom: 4
                }}>
                  {k.icon}
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: k.color }}>{k.value}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{k.label}</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{k.sub}</p>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            {/* Revenue trend */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: 'var(--space-6)'
            }}>
              <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Revenue Trend</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 'var(--space-5)' }}>Monthly revenue (last 6 months)</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={MONTHLY_REVENUE}>
                  <defs>
                    <linearGradient id="financeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C2A36B" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#C2A36B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} formatter={(v) => [formatCurrency(v), 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#C2A36B" strokeWidth={2} fill="url(#financeGrad)" dot={{ fill: '#C2A36B', r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Payment methods */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: 'var(--space-6)'
            }}>
              <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Payment Methods</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>By revenue</p>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={METHOD_DATA} layout="vertical" barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}`} />
                  <YAxis dataKey="method" type="category" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
                  <Tooltip contentStyle={{ background: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} formatter={(v) => [formatCurrency(v), 'Revenue']} />
                  <Bar dataKey="amount" fill="#C2A36B" radius={[0, 4, 4, 0]} opacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
                {METHOD_DATA.map(m => (
                  <div key={m.method} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{m.method}</span>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(m.amount)}</p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{m.count} txns</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', overflow: 'hidden',
          }}>
            <div style={{
              padding: 'var(--space-5) var(--space-6)', borderBottom: '1px solid var(--border)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)'
            }}>
              <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>
                Transaction Log
              </h3>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Search */}
                <div style={{ position: 'relative' }}>
                  <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <input
                    id="finance-search"
                    className="form-input"
                    style={{ paddingLeft: 32, width: 220 }}
                    placeholder="Search transactions..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                {/* Status filter */}
                {['All', 'success', 'pending', 'refunded'].map(s => (
                  <button
                    key={s}
                    className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ borderRadius: 'var(--radius-full)', textTransform: 'capitalize' }}
                    onClick={() => setStatusFilter(s)}
                    id={`txn-status-${s}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Txn ID</th>
                    <th>Participant</th>
                    <th>Event</th>
                    <th>Method</th>
                    <th>Reference</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(t => (
                    <tr key={t.id}>
                      <td>
                        <code style={{
                          background: 'var(--surface-elevated)', padding: '2px 8px',
                          borderRadius: 4, fontSize: '0.7rem', color: 'var(--text-secondary)'
                        }}>
                          {t.id}
                        </code>
                      </td>
                      <td style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{t.name}</td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                        {t.event.length > 22 ? t.event.slice(0, 22) + '…' : t.event}
                      </td>
                      <td>
                        <span style={{
                          background: 'var(--surface-elevated)', fontSize: '0.75rem',
                          fontWeight: 600, padding: '3px 10px', borderRadius: 'var(--radius-full)',
                          color: 'var(--text-secondary)',
                        }}>
                          {t.method}
                        </span>
                      </td>
                      <td>
                        <code style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t.txnRef}</code>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={{
                        fontWeight: 800, fontSize: '0.9rem',
                        color: t.status === 'success' ? 'var(--success)' : t.status === 'refunded' ? 'var(--error)' : 'var(--text-primary)'
                      }}>
                        {t.status === 'refunded' ? `−₹${Math.abs(t.amount).toLocaleString()}` : `₹${t.amount.toLocaleString()}`}
                      </td>
                      <td><span className={`badge ${STATUS_BADGE[t.status]}`}>{t.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div style={{ padding: 'var(--space-10)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                No transactions match your filters
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
