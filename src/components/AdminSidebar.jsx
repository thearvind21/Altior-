import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminSidebar.css';

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    label: 'Events',
    href: '/admin/events',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Participants',
    href: '/admin/participants',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: 'Finance',
    href: '/admin/finance',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

export default function AdminSidebar({ collapsed, setCollapsed }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href) =>
    location.pathname === href || location.pathname.startsWith(href + '/');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">A</div>
        {!collapsed && (
          <div className="sidebar-logo-text">
            <span className="logo-text">Altior</span>
            <span className="logo-sub">Admin Panel</span>
          </div>
        )}
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {collapsed
              ? <path d="M9 18l6-6-6-6"/>
              : <path d="M15 18l-6-6 6-6"/>
            }
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section">
          {!collapsed && <span className="sidebar-section-label">Navigation</span>}
          {navItems.map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={`sidebar-link ${isActive(item.href) ? 'active' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {!collapsed && <span className="sidebar-link-label">{item.label}</span>}
              {isActive(item.href) && !collapsed && (
                <span className="sidebar-active-dot" />
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        {/* View Site */}
        <Link
          to="/"
          className="sidebar-link"
          target="_blank"
          title={collapsed ? 'View Site' : undefined}
        >
          <span className="sidebar-link-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </span>
          {!collapsed && <span className="sidebar-link-label">View Site</span>}
        </Link>

        {/* User profile */}
        {!collapsed && user && (
          <div className="sidebar-user">
            <div className="avatar" style={{ width: 36, height: 36 }}>
              {user.avatar}
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{user.name}</span>
              <span className="sidebar-user-role">{user.role}</span>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          className="sidebar-link sidebar-logout"
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
        >
          <span className="sidebar-link-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </span>
          {!collapsed && <span className="sidebar-link-label">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
