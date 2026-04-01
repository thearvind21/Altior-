import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { eventsData } from '../data/mockData';

const CATEGORIES = ['All', 'Technology', 'Design', 'Entrepreneurship', 'Finance', 'Hackathon', 'Leadership'];
const SORT_OPTIONS = [
  { value: 'date', label: 'Earliest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'seats', label: 'Most Seats Available' },
];

export default function Events() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('date');
  const [showFree, setShowFree] = useState(false);

  const filteredEvents = useMemo(() => {
    let events = [...eventsData];
    if (search) {
      const q = search.toLowerCase();
      events = events.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
      );
    }
    if (category !== 'All') {
      events = events.filter(e => e.category === category);
    }
    if (showFree) {
      events = events.filter(e => e.isFree);
    }
    switch (sort) {
      case 'date': events.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case 'price-asc': events.sort((a, b) => a.price - b.price); break;
      case 'price-desc': events.sort((a, b) => b.price - a.price); break;
      case 'seats': events.sort((a, b) => (b.capacity - b.registered) - (a.capacity - a.registered)); break;
    }
    return events;
  }, [search, category, sort, showFree]);

  return (
    <div className="page-enter">
      <Navbar />

      {/* Page Header */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        padding: 'var(--space-12) 0'
      }}>
        <div className="container">
          <p className="section-eyebrow">Discover</p>
          <h1 className="section-title" style={{ marginTop: 8 }}>All Events</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
            {eventsData.length} upcoming events across India
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 64,
        zIndex: 50,
        padding: 'var(--space-4) 0'
      }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
              <svg
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                className="form-input"
                style={{ paddingLeft: '40px' }}
                placeholder="Search events, cities..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                id="events-search"
              />
            </div>

            {/* Sort */}
            <select
              className="form-select"
              style={{ width: 'auto' }}
              value={sort}
              onChange={e => setSort(e.target.value)}
              id="events-sort"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {/* Free filter toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
              <input
                type="checkbox"
                checked={showFree}
                onChange={e => setShowFree(e.target.checked)}
                id="free-filter"
                style={{ accentColor: 'var(--primary)' }}
              />
              Free Only
            </label>
          </div>

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-ghost'}`}
                style={{ borderRadius: 'var(--radius-full)' }}
                id={`cat-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container" style={{ padding: 'var(--space-10) var(--space-6)' }}>
        {filteredEvents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700 }}>No events found</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Try adjusting your filters</p>
            <button className="btn btn-outline" onClick={() => { setSearch(''); setCategory('All'); setShowFree(false); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 'var(--space-5)' }}>
              Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'var(--space-6)'
            }}>
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
