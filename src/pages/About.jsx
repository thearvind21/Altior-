import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Landing.css'; // Reuse landing styles for consistency

const MISSION_PILLARS = [
  {
    icon: '💡',
    title: 'Innovative Education',
    desc: 'Pioneering new approaches to learning that inspire curiosity and critical thinking.',
  },
  {
    icon: '📖',
    title: 'Accessible Learning',
    desc: 'Creating educational opportunities that are inclusive and accessible to all students.',
  },
  {
    icon: '🌐',
    title: 'Community Impact',
    desc: 'Building stronger communities through educational initiatives and partnerships.',
  },
];

export default function About() {
  return (
    <div className="about-page page-enter">
      <Navbar />

      {/* Hero Header */}
      <section className="hero" style={{ minHeight: 'auto', padding: 'var(--space-24) 0 var(--space-12)' }}>
        <div className="hero-bg">
          <div className="hero-grid-pattern" />
          <div className="hero-gradient-1" />
        </div>
        <div className="container hero-content">
          <p className="section-eyebrow">Our Mission & Vision</p>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}>
            Shaping the Leaders <br />
            <span className="gradient-text">of Tomorrow</span>
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: 600 }}>
            Altior Group is dedicated to empowering students through world-class educational events and community-driven initiatives.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="landing-section">
        <div className="container">
          <div className="about-grid" style={{ marginBottom: 'var(--space-20)' }}>
            <div className="about-content">
              <h2 className="section-title">Our Story</h2>
              <div className="about-text">
                <p>
                  <strong>ALTIOR Group</strong>, registered as Altior Educational Services LLP [ACL-0888], was founded in August 2020 with the mindset of bringing a change to society and developing a platform for the younger generation to polish up their skills.
                </p>
                <p>
                  Founded during an era of great uncertainty, our members saw a noble opportunity to serve. We began with awareness events and <strong>Model United Nations (MUN)</strong> conferences, providing students a platform to learn about the world and address global issues.
                </p>
                <p>
                  Since then, we have grown exponentially, hosting over <strong>8,000+ participants</strong> across <strong>12+ major conferences</strong> at prestigious institutions like IITD, DTU, and Hindu College.
                </p>
              </div>
            </div>
            
            <div className="about-cards">
              <div className="about-card highlight">
                <div className="about-card-icon">🤝</div>
                <h3 className="about-card-title">NGO 'Inayat'</h3>
                <p className="about-card-desc">
                  Altior Group proudly runs its own NGO, 'Inayat'. Built on change, prosperity, and perseverance, we serve society through impactful charity works.
                </p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <h2 className="section-title">Our Mission</h2>
            <div style={{ width: 60, height: 3, background: 'var(--primary)', margin: '1rem auto' }} />
          </div>

          <div className="mission-grid">
            {MISSION_PILLARS.map((m, i) => (
              <div key={i} className="mission-card">
                <div className="mission-icon">
                  {m.icon}
                </div>
                <h3 className="mission-title">{m.title}</h3>
                <p className="mission-desc">{m.desc}</p>
              </div>
            ))}
          </div>

          <style>{`
            .mission-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: var(--space-8);
              max-width: 1000px;
              margin: 0 auto;
            }
            @media (min-width: 768px) {
              .mission-grid {
                grid-template-columns: repeat(3, 1fr);
              }
            }
            .mission-card {
              background: var(--surface);
              border: 1px solid var(--border);
              border-radius: var(--radius-lg);
              padding: var(--space-10);
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              gap: var(--space-5);
              transition: var(--transition-slow);
            }
            .mission-card:hover {
              border-color: var(--border-light);
              transform: translateY(-5px);
              box-shadow: var(--shadow-xl);
            }
            .mission-icon {
              width: 80px;
              height: 80px;
              background: var(--surface-elevated);
              border-radius: var(--radius-full);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 2.5rem;
              margin-bottom: var(--space-2);
            }
            .mission-title {
              font-size: 1.25rem;
              font-weight: 800;
              color: var(--text-primary);
            }
            .mission-desc {
              font-size: 0.95rem;
              color: var(--text-secondary);
              line-height: 1.6;
            }
          `}</style>
        </div>
      </section>

      <Footer />
    </div>
  );
}
