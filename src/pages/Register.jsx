import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { eventsData, formatCurrency, formatDate } from '../data/mockData';

const STEPS = ['Personal Info', 'Event Details', 'Confirmation'];

export default function Register() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventsData.find(e => e.id === id);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    college: '',
    organization: '',
    committee: '',
    dietary: '',
    tshirt: '',
    agree: false,
  });
  const [errors, setErrors] = useState({});

  if (!event) {
    return (
      <div className="page-enter">
        <Navbar />
        <div className="empty-state" style={{ minHeight: '60vh' }}>
          <h3 style={{ color: 'var(--text-primary)' }}>Event not found</h3>
          <Link to="/events" className="btn btn-primary">Browse Events</Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.phone.trim() || form.phone.length < 10) errs.phone = 'Valid phone is required';
    if (!form.college.trim()) errs.college = 'College / Organization is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }));
  };

  const nextStep = () => {
    if (step === 0) {
      const errs = validate();
      if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    }
    setStep(s => s + 1);
  };

  const handleSubmit = () => {
    if (!form.agree) { setErrors({ agree: 'Please accept terms' }); return; }
    setLoading(true);
    setTimeout(() => {
      navigate('/success', {
        state: {
          event,
          participant: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            phone: form.phone,
            college: form.college,
            committee: form.committee || event.committees[0]?.name,
            ticketId: `TKT-${event.id.slice(-3).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
          }
        }
      });
    }, 1800);
  };

  return (
    <div className="page-enter">
      <Navbar />

      <div style={{
        background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)',
        padding: 'var(--space-10) 0'
      }}>
        <div className="container">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 8 }}>
            <Link to="/events" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Events</Link>
            {' › '}
            <Link to={`/events/${event.id}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{event.title}</Link>
            {' › Register'}
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)'
          }}>
            Registration Form
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
            Complete your registration for <strong style={{ color: 'var(--text-primary)' }}>{event.title}</strong>
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: 'var(--space-10) var(--space-6)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-8)', alignItems: 'start' }}>
          
          {/* Form */}
          <div>
            {/* Stepper */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-8)', gap: 0 }}>
              {STEPS.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: i <= step ? 'var(--primary)' : 'var(--surface)',
                      border: `2px solid ${i <= step ? 'var(--primary)' : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', fontWeight: 700,
                      color: i <= step ? '#fff' : 'var(--text-muted)',
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                    }}>
                      {i < step ? '✓' : i + 1}
                    </div>
                    <span style={{
                      fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap',
                      color: i <= step ? 'var(--text-primary)' : 'var(--text-muted)'
                    }}>
                      {s}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{
                      flex: 1, height: 2, margin: '0 12px',
                      background: i < step ? 'var(--primary)' : 'var(--border)',
                      transition: 'background 0.3s ease',
                    }} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 0 — Personal Info */}
            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  {[
                    { name: 'firstName', label: 'First Name', placeholder: 'Aarav' },
                    { name: 'lastName', label: 'Last Name', placeholder: 'Sharma' },
                  ].map(f => (
                    <div className="form-group" key={f.name}>
                      <label className="form-label">{f.label} *</label>
                      <input
                        id={`reg-${f.name}`}
                        name={f.name}
                        className="form-input"
                        placeholder={f.placeholder}
                        value={form[f.name]}
                        onChange={handleChange}
                        style={{ borderColor: errors[f.name] ? 'var(--error)' : '' }}
                      />
                      {errors[f.name] && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{errors[f.name]}</span>}
                    </div>
                  ))}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    id="reg-email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="aarav@example.com"
                    value={form.email}
                    onChange={handleChange}
                    style={{ borderColor: errors.email ? 'var(--error)' : '' }}
                  />
                  {errors.email && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    id="reg-phone"
                    name="phone"
                    type="tel"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    style={{ borderColor: errors.phone ? 'var(--error)' : '' }}
                  />
                  {errors.phone && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">College / Organization *</label>
                  <input
                    id="reg-college"
                    name="college"
                    className="form-input"
                    placeholder="IIT Bombay / Infosys Ltd."
                    value={form.college}
                    onChange={handleChange}
                    style={{ borderColor: errors.college ? 'var(--error)' : '' }}
                  />
                  {errors.college && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{errors.college}</span>}
                </div>

                <button className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-end' }} onClick={nextStep} id="step0-next">
                  Continue
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            )}

            {/* Step 1 — Event Details */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <div className="form-group">
                  <label className="form-label">Preferred Committee</label>
                  <select
                    id="reg-committee"
                    name="committee"
                    className="form-select"
                    value={form.committee}
                    onChange={handleChange}
                  >
                    <option value="">Select a committee</option>
                    {event.committees.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Dietary Preference</label>
                  <select id="reg-dietary" name="dietary" className="form-select" value={form.dietary} onChange={handleChange}>
                    <option value="">No preference</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="non-vegetarian">Non-Vegetarian</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">T-Shirt Size</label>
                  <select id="reg-tshirt" name="tshirt" className="form-select" value={form.tshirt} onChange={handleChange}>
                    <option value="">Select size</option>
                    {['XS','S','M','L','XL','XXL'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'space-between' }}>
                  <button className="btn btn-outline" onClick={() => setStep(0)}>← Back</button>
                  <button className="btn btn-primary btn-lg" onClick={nextStep} id="step1-next">
                    Review Registration
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 — Confirm */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <h3 style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Review Your Details</h3>

                <div style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)', overflow: 'hidden'
                }}>
                  {[
                    { label: 'Full Name', value: `${form.firstName} ${form.lastName}` },
                    { label: 'Email', value: form.email },
                    { label: 'Phone', value: form.phone },
                    { label: 'College/Org', value: form.college },
                    { label: 'Committee', value: form.committee || 'Not selected' },
                    { label: 'Dietary', value: form.dietary || 'No preference' },
                  ].map((row, i, arr) => (
                    <div key={row.label} style={{
                      display: 'flex', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-5)',
                      borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                    }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{row.label}</span>
                      <span style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600 }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Payment summary */}
                <div style={{
                  background: 'var(--primary-subtle)', border: '1px solid var(--border-glow)',
                  borderRadius: 'var(--radius)', padding: 'var(--space-4)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Amount Due</span>
                  <span style={{
                    color: event.isFree ? 'var(--success)' : 'var(--primary-light)',
                    fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900
                  }}>
                    {formatCurrency(event.price)}
                  </span>
                </div>

                {/* Agreement */}
                <label style={{ display: 'flex', gap: 10, cursor: 'pointer', alignItems: 'flex-start' }}>
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    style={{ accentColor: 'var(--primary)', marginTop: 3 }}
                    id="reg-agree"
                  />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    I agree to the <a href="#" style={{ color: 'var(--primary-light)' }}>Terms & Conditions</a> and{' '}
                    <a href="#" style={{ color: 'var(--primary-light)' }}>Privacy Policy</a> of Altior.
                  </span>
                </label>
                {errors.agree && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{errors.agree}</span>}

                <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'space-between' }}>
                  <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleSubmit}
                    disabled={loading}
                    id="submit-registration"
                    style={{ minWidth: 180 }}
                  >
                    {loading ? (
                      <><div className="spinner" /> Processing...</>
                    ) : (
                      <>
                        {event.isFree ? 'Confirm Registration' : 'Pay & Register'}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20,6 9,17 4,12"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right — Event Summary */}
          <div style={{ position: 'sticky', top: 'calc(64px + 20px)' }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            }}>
              <div style={{
                background: `${event.color}18`, borderBottom: '1px solid var(--border)',
                padding: 'var(--space-5)',
              }}>
                <span className="badge badge-gray" style={{ marginBottom: 8 }}>{event.category}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  {event.title}
                </h3>
              </div>
              <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {[
                  { icon: '📅', label: formatDate(event.date) },
                  { icon: '🕐', label: event.time },
                  { icon: '📍', label: `${event.venue}, ${event.city}` },
                  { icon: '💰', label: formatCurrency(event.price) },
                ].map(m => (
                  <div key={m.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span>{m.icon}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{m.label}</span>
                  </div>
                ))}
                <div className="divider" />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  You'll receive a confirmation email with your QR ticket upon successful registration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
