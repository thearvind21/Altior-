import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Landing from './pages/Landing';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Register from './pages/Register';
import Success from './pages/Success';
import About from './pages/About';

// Admin pages
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminEvents from './pages/admin/AdminEvents';
import AdminEventDetail from './pages/admin/AdminEventDetail';
import Participants from './pages/admin/Participants';
import Finance from './pages/admin/Finance';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/register/:id" element={<Register />} />
          <Route path="/success" element={<Success />} />

          {/* Admin Login (public) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/admin/events"
            element={<ProtectedRoute><AdminEvents /></ProtectedRoute>}
          />
          <Route
            path="/admin/events/:id"
            element={<ProtectedRoute><AdminEventDetail /></ProtectedRoute>}
          />
          <Route
            path="/admin/participants"
            element={<ProtectedRoute><Participants /></ProtectedRoute>}
          />
          <Route
            path="/admin/finance"
            element={<ProtectedRoute><Finance /></ProtectedRoute>}
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
