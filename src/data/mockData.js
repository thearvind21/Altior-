// src/data/mockData.js
// =============================================
// CENTRALIZED MOCK DATA — All pages consume this
// =============================================

export const eventsData = [
  {
    id: "evt-001",
    title: "Tech Summit 2026",
    slug: "tech-summit-2026",
    category: "Technology",
    date: "2026-05-15",
    endDate: "2026-05-17",
    time: "09:00 AM",
    venue: "Bangalore International Convention Centre",
    city: "Bangalore",
    country: "India",
    price: 2499,
    currency: "INR",
    capacity: 500,
    registered: 387,
    status: "upcoming",
    featured: true,
    image: null,
    color: "#16A34A",
    description: "India's premier technology summit bringing together innovators, engineers, and industry leaders. Three days of insights, workshops, and networking across AI, Web3, Cloud, and Sustainability tracks.",
    longDescription: "Tech Summit 2026 is the flagship technology conference for South Asia. This three-day event gathers 500+ professionals across AI/ML, Cloud Computing, Web3, and Green Technology. Featuring keynotes from top industry leaders, hands-on workshops, live demos, and unparalleled networking opportunities.",
    committees: [
      { name: "AI & Machine Learning", head: "Dr. Priya Nair", members: 45 },
      { name: "Cloud & DevOps", head: "Rohan Mehta", members: 38 },
      { name: "Web3 & Blockchain", head: "Ananya Singh", members: 29 },
      { name: "Sustainability Tech", head: "Vikram Rajan", members: 22 },
    ],
    agenda: [
      { time: "09:00 AM", title: "Opening Keynote", speaker: "CEO Panel" },
      { time: "11:00 AM", title: "AI in Enterprise", speaker: "Dr. Priya Nair" },
      { time: "02:00 PM", title: "Workshop: LLM Fine-tuning", speaker: "Rohan Mehta" },
      { time: "05:00 PM", title: "Networking Mixer", speaker: "" },
    ],
    speakers: [
      { name: "Dr. Priya Nair", role: "AI Research Lead, IISc", avatar: "PN" },
      { name: "Rohan Mehta", role: "CTO, DevStack", avatar: "RM" },
      { name: "Ananya Singh", role: "Blockchain Architect, Web3Labs", avatar: "AS" },
    ],
    tags: ["AI", "Cloud", "Blockchain", "Networking"],
    isFree: false,
    certificateProvided: true,
    qrCheckIn: true,
    liveUpdates: true,
  },
  {
    id: "evt-002",
    title: "Design Forward 2026",
    slug: "design-forward-2026",
    category: "Design",
    date: "2026-06-03",
    endDate: "2026-06-04",
    time: "10:00 AM",
    venue: "The Design Hub",
    city: "Mumbai",
    country: "India",
    price: 1799,
    currency: "INR",
    capacity: 250,
    registered: 198,
    status: "upcoming",
    featured: true,
    image: null,
    color: "#C2A36B",
    description: "A premium 2-day design conference exploring the intersection of UX, product design, and human-computer interaction.",
    longDescription: "Design Forward 2026 is a curated gathering for designers, product managers, and creative technologists. Explore the future of UX research, design systems, motion design, and accessibility. Featuring live critiques, portfolio reviews, and workshops with industry-leading designers.",
    committees: [
      { name: "UX Research", head: "Meera Kapoor", members: 20 },
      { name: "Visual Design", head: "Arjun Bose", members: 18 },
      { name: "Design Systems", head: "Nisha Verma", members: 15 },
    ],
    agenda: [
      { time: "10:00 AM", title: "Design Thinking in 2026", speaker: "Meera Kapoor" },
      { time: "12:00 PM", title: "Building Design Systems at Scale", speaker: "Nisha Verma" },
      { time: "02:30 PM", title: "Portfolio Workshop", speaker: "Open Session" },
      { time: "04:30 PM", title: "Design Critique Panel", speaker: "Panelists" },
    ],
    speakers: [
      { name: "Meera Kapoor", role: "Head of Design, Flipkart", avatar: "MK" },
      { name: "Arjun Bose", role: "Senior UX, Google", avatar: "AB" },
      { name: "Nisha Verma", role: "Design Lead, Razorpay", avatar: "NV" },
    ],
    tags: ["UX", "Design Systems", "Product Design"],
    isFree: false,
    certificateProvided: true,
    qrCheckIn: true,
    liveUpdates: true,
  },
  {
    id: "evt-003",
    title: "Startup Pitch Night",
    slug: "startup-pitch-night",
    category: "Entrepreneurship",
    date: "2026-04-22",
    endDate: "2026-04-22",
    time: "06:00 PM",
    venue: "NASSCOM Innovation Hub",
    city: "Hyderabad",
    country: "India",
    price: 0,
    currency: "INR",
    capacity: 150,
    registered: 143,
    status: "upcoming",
    featured: false,
    image: null,
    color: "#3B82F6",
    description: "An evening where 10 curated startups pitch to a panel of VCs and angel investors. Free to attend, high-impact.",
    longDescription: "Startup Pitch Night brings together the most promising early-stage founders for a fast-paced pitch evening. Each startup gets 5 minutes to pitch, followed by a Q&A with investor panelists. Perfect for founders, aspiring entrepreneurs, and investors looking for the next big thing.",
    committees: [
      { name: "Startup Selection", head: "Rahul Sharma", members: 8 },
      { name: "Investor Relations", head: "Deepa Nair", members: 6 },
    ],
    agenda: [
      { time: "06:00 PM", title: "Welcome & Introductions", speaker: "" },
      { time: "06:30 PM", title: "Startup Pitches (Round 1–5)", speaker: "Founders" },
      { time: "08:00 PM", title: "Investor Panel Q&A", speaker: "VC Panel" },
      { time: "08:45 PM", title: "Awards & Networking", speaker: "" },
    ],
    speakers: [
      { name: "Rahul Sharma", role: "Partner, Matrix Partners", avatar: "RS" },
      { name: "Deepa Nair", role: "Angel Investor & Operator", avatar: "DN" },
    ],
    tags: ["Startups", "Investment", "Pitching", "Free"],
    isFree: true,
    certificateProvided: false,
    qrCheckIn: true,
    liveUpdates: false,
  },
  {
    id: "evt-004",
    title: "FinTech Innovations 2026",
    slug: "fintech-innovations-2026",
    category: "Finance",
    date: "2026-07-10",
    endDate: "2026-07-11",
    time: "09:30 AM",
    venue: "Bombay Stock Exchange Auditorium",
    city: "Mumbai",
    country: "India",
    price: 3499,
    currency: "INR",
    capacity: 300,
    registered: 89,
    status: "upcoming",
    featured: true,
    image: null,
    color: "#F59E0B",
    description: "Explore the future of payments, lending, insurance, and investment technology in India's leading FinTech forum.",
    longDescription: "FinTech Innovations 2026 is India's most comprehensive financial technology summit. Covering payments infrastructure, digital lending, regtech, wealthtech, and the future of banking. Exclusively curated for CXOs, regulators, and fintech builders.",
    committees: [
      { name: "Payments & Infrastructure", head: "Karan Malhotra", members: 25 },
      { name: "Digital Lending", head: "Sunita Rao", members: 20 },
      { name: "Wealth & Investment Tech", head: "Aarav Joshi", members: 18 },
    ],
    agenda: [
      { time: "09:30 AM", title: "RBI Regulatory Update", speaker: "Keynote" },
      { time: "11:00 AM", title: "UPI 3.0: What's Next", speaker: "NPCI Panel" },
      { time: "02:00 PM", title: "AI in Credit Scoring", speaker: "Karan Malhotra" },
      { time: "04:00 PM", title: "Investor Roundtable", speaker: "VC Panel" },
    ],
    speakers: [
      { name: "Karan Malhotra", role: "MD, Razorpay", avatar: "KM" },
      { name: "Sunita Rao", role: "CTO, Faircent", avatar: "SR" },
      { name: "Aarav Joshi", role: "Founder, WealthDesk", avatar: "AJ" },
    ],
    tags: ["Payments", "Fintech", "Banking", "Investment"],
    isFree: false,
    certificateProvided: true,
    qrCheckIn: true,
    liveUpdates: true,
  },
  {
    id: "evt-005",
    title: "Climate & Code Hackathon",
    slug: "climate-code-hackathon",
    category: "Hackathon",
    date: "2026-05-28",
    endDate: "2026-05-30",
    time: "08:00 AM",
    venue: "IIT Delhi Innovation Lab",
    city: "Delhi",
    country: "India",
    price: 499,
    currency: "INR",
    capacity: 400,
    registered: 311,
    status: "upcoming",
    featured: false,
    image: null,
    color: "#22C55E",
    description: "72-hour hackathon focused on building climate-tech solutions. ₹5L prize pool. Open to all developers.",
    longDescription: "Climate & Code is a 72-hour marathon where developers, designers, and domain experts build solutions to real climate challenges. Themes include carbon tracking, energy optimization, sustainable agriculture, and climate AI. Teams of 3–5. ₹5L total prize pool with mentors from top firms.",
    committees: [
      { name: "Judging Panel", head: "Dr. Ramesh Krishnan", members: 12 },
      { name: "Mentors", head: "Tanvi Bakshi", members: 30 },
      { name: "Logistics", head: "Surya Prakash", members: 15 },
    ],
    agenda: [
      { time: "Day 1 08:00 AM", title: "Check-in & Kickoff", speaker: "" },
      { time: "Day 1 10:00 AM", title: "Problem Statement Reveals", speaker: "" },
      { time: "Day 2 All Day", title: "Hacking + Mentorship", speaker: "Mentors" },
      { time: "Day 3 12:00 PM", title: "Final Pitches", speaker: "Teams" },
    ],
    speakers: [
      { name: "Dr. Ramesh Krishnan", role: "Climate Scientist, TERI", avatar: "RK" },
      { name: "Tanvi Bakshi", role: "Sustainability Lead, Accenture", avatar: "TB" },
    ],
    tags: ["Hackathon", "Climate", "Sustainability", "Prizes"],
    isFree: false,
    certificateProvided: true,
    qrCheckIn: true,
    liveUpdates: true,
  },
  {
    id: "evt-006",
    title: "Women in Leadership Forum",
    slug: "women-leadership-forum",
    category: "Leadership",
    date: "2026-08-14",
    endDate: "2026-08-14",
    time: "10:00 AM",
    venue: "Taj Lands End",
    city: "Mumbai",
    country: "India",
    price: 1999,
    currency: "INR",
    capacity: 200,
    registered: 164,
    status: "upcoming",
    featured: false,
    image: null,
    color: "#A855F7",
    description: "A premium half-day forum celebrating and empowering women leaders across tech, finance, and entrepreneurship.",
    longDescription: "Women in Leadership Forum 2026 brings together 200 exceptional women leaders for an afternoon of inspiration, strategy, and community. Panel discussions on breaking barriers, executive presence, board readiness, and funding for women-led ventures.",
    committees: [
      { name: "Speaker Curation", head: "Rekha Pillai", members: 10 },
      { name: "Community", head: "Ishita Roy", members: 15 },
    ],
    agenda: [
      { time: "10:00 AM", title: "Opening Keynote", speaker: "Rekha Pillai" },
      { time: "11:00 AM", title: "Panel: Breaking the Glass Ceiling", speaker: "4 Panelists" },
      { time: "01:00 PM", title: "Networking Lunch", speaker: "" },
      { time: "02:30 PM", title: "Awards Ceremony", speaker: "" },
    ],
    speakers: [
      { name: "Rekha Pillai", role: "CEO, TechVenture India", avatar: "RP" },
      { name: "Ishita Roy", role: "Partner, Sequoia India", avatar: "IR" },
    ],
    tags: ["Leadership", "Women", "Networking", "Empowerment"],
    isFree: false,
    certificateProvided: true,
    qrCheckIn: false,
    liveUpdates: false,
  },
];

export const participantsData = [
  { id: "p-001", name: "Aditya Kumar", email: "aditya.k@gmail.com", college: "IIT Bombay", eventId: "evt-001", eventTitle: "Tech Summit 2026", committee: "AI & Machine Learning", status: "confirmed", payment: "paid", amount: 2499, registeredAt: "2026-03-10T09:30:00Z", ticketId: "TKT-001-AK" },
  { id: "p-002", name: "Sneha Reddy", email: "sneha.r@outlook.com", college: "BITS Pilani", eventId: "evt-001", eventTitle: "Tech Summit 2026", committee: "Cloud & DevOps", status: "confirmed", payment: "paid", amount: 2499, registeredAt: "2026-03-11T14:20:00Z", ticketId: "TKT-001-SR" },
  { id: "p-003", name: "Rahul Patel", email: "r.patel@yahoo.com", college: "NIT Surat", eventId: "evt-002", eventTitle: "Design Forward 2026", committee: "UX Research", status: "pending", payment: "pending", amount: 1799, registeredAt: "2026-03-12T11:00:00Z", ticketId: "TKT-002-RP" },
  { id: "p-004", name: "Pooja Sharma", email: "pooja.s@gmail.com", college: "Manipal University", eventId: "evt-001", eventTitle: "Tech Summit 2026", committee: "Web3 & Blockchain", status: "confirmed", payment: "paid", amount: 2499, registeredAt: "2026-03-13T16:45:00Z", ticketId: "TKT-001-PS" },
  { id: "p-005", name: "Kiran Nair", email: "kiran.nair@proton.me", college: "MES College", eventId: "evt-003", eventTitle: "Startup Pitch Night", committee: "Startup Selection", status: "confirmed", payment: "free", amount: 0, registeredAt: "2026-03-14T08:30:00Z", ticketId: "TKT-003-KN" },
  { id: "p-006", name: "Arjun Mishra", email: "arjun.m@iitd.ac.in", college: "IIT Delhi", eventId: "evt-005", eventTitle: "Climate & Code Hackathon", committee: "Participants", status: "confirmed", payment: "paid", amount: 499, registeredAt: "2026-03-15T10:15:00Z", ticketId: "TKT-005-AM" },
  { id: "p-007", name: "Divya Gupta", email: "divya.g@wipro.com", college: "VIT Vellore", eventId: "evt-004", eventTitle: "FinTech Innovations 2026", committee: "Payments & Infrastructure", status: "confirmed", payment: "paid", amount: 3499, registeredAt: "2026-03-16T13:00:00Z", ticketId: "TKT-004-DG" },
  { id: "p-008", name: "Sanjay Iyer", email: "sanjay.i@tcs.com", college: "Anna University", eventId: "evt-001", eventTitle: "Tech Summit 2026", committee: "AI & Machine Learning", status: "cancelled", payment: "refunded", amount: 2499, registeredAt: "2026-03-08T09:00:00Z", ticketId: "TKT-001-SI" },
  { id: "p-009", name: "Priya Menon", email: "priya.m@gmail.com", college: "SRM University", eventId: "evt-006", eventTitle: "Women in Leadership Forum", committee: "Attendee", status: "confirmed", payment: "paid", amount: 1999, registeredAt: "2026-03-18T12:30:00Z", ticketId: "TKT-006-PM" },
  { id: "p-010", name: "Nikhil Agarwal", email: "nikhil.a@amazon.com", college: "IIM Ahmedabad", eventId: "evt-004", eventTitle: "FinTech Innovations 2026", committee: "Digital Lending", status: "pending", payment: "pending", amount: 3499, registeredAt: "2026-03-19T15:45:00Z", ticketId: "TKT-004-NA" },
  { id: "p-011", name: "Ananya Das", email: "ananya.d@gmail.com", college: "Jadavpur University", eventId: "evt-005", eventTitle: "Climate & Code Hackathon", committee: "Participants", status: "confirmed", payment: "paid", amount: 499, registeredAt: "2026-03-20T11:20:00Z", ticketId: "TKT-005-AD" },
  { id: "p-012", name: "Rohit Verma", email: "rohit.v@infosys.com", college: "NIT Trichy", eventId: "evt-002", eventTitle: "Design Forward 2026", committee: "Visual Design", status: "confirmed", payment: "paid", amount: 1799, registeredAt: "2026-03-21T09:45:00Z", ticketId: "TKT-002-RV" },
];

export const transactionsData = [
  { id: "txn-0001", participantId: "p-001", name: "Aditya Kumar", event: "Tech Summit 2026", amount: 2499, status: "success", method: "UPI", date: "2026-03-10T09:35:00Z", txnRef: "UPI2026031001" },
  { id: "txn-0002", participantId: "p-002", name: "Sneha Reddy", event: "Tech Summit 2026", amount: 2499, status: "success", method: "Card", date: "2026-03-11T14:25:00Z", txnRef: "CARD2026031102" },
  { id: "txn-0003", participantId: "p-003", name: "Rahul Patel", event: "Design Forward 2026", amount: 1799, status: "pending", method: "NetBanking", date: "2026-03-12T11:05:00Z", txnRef: "NB2026031203" },
  { id: "txn-0004", participantId: "p-004", name: "Pooja Sharma", event: "Tech Summit 2026", amount: 2499, status: "success", method: "UPI", date: "2026-03-13T16:50:00Z", txnRef: "UPI2026031304" },
  { id: "txn-0005", participantId: "p-006", name: "Arjun Mishra", event: "Climate & Code Hackathon", amount: 499, status: "success", method: "UPI", date: "2026-03-15T10:20:00Z", txnRef: "UPI2026031506" },
  { id: "txn-0006", participantId: "p-007", name: "Divya Gupta", event: "FinTech Innovations 2026", amount: 3499, status: "success", method: "Card", date: "2026-03-16T13:05:00Z", txnRef: "CARD2026031607" },
  { id: "txn-0007", participantId: "p-008", name: "Sanjay Iyer", event: "Tech Summit 2026", amount: -2499, status: "refunded", method: "UPI", date: "2026-03-18T10:00:00Z", txnRef: "REF2026031808" },
  { id: "txn-0008", participantId: "p-009", name: "Priya Menon", event: "Women in Leadership Forum", amount: 1999, status: "success", method: "Card", date: "2026-03-18T12:35:00Z", txnRef: "CARD2026031809" },
  { id: "txn-0009", participantId: "p-010", name: "Nikhil Agarwal", event: "FinTech Innovations 2026", amount: 3499, status: "pending", method: "NetBanking", date: "2026-03-19T15:50:00Z", txnRef: "NB2026031910" },
  { id: "txn-0010", participantId: "p-011", name: "Ananya Das", event: "Climate & Code Hackathon", amount: 499, status: "success", method: "UPI", date: "2026-03-20T11:25:00Z", txnRef: "UPI2026032011" },
  { id: "txn-0011", participantId: "p-012", name: "Rohit Verma", event: "Design Forward 2026", amount: 1799, status: "success", method: "Card", date: "2026-03-21T09:50:00Z", txnRef: "CARD2026032112" },
];

// Revenue chart data (monthly)
export const revenueChartData = [
  { month: "Oct", revenue: 12400, registrations: 48 },
  { month: "Nov", revenue: 18900, registrations: 67 },
  { month: "Dec", revenue: 15200, registrations: 54 },
  { month: "Jan", revenue: 24500, registrations: 89 },
  { month: "Feb", revenue: 31200, registrations: 112 },
  { month: "Mar", revenue: 28700, registrations: 98 },
];

// Event registration breakdown
export const registrationBreakdown = [
  { name: "Tech Summit", value: 387, color: "#16A34A" },
  { name: "Design Forward", value: 198, color: "#C2A36B" },
  { name: "Startup Pitch", value: 143, color: "#3B82F6" },
  { name: "FinTech Forum", value: 89, color: "#F59E0B" },
  { name: "Hackathon", value: 311, color: "#22C55E" },
  { name: "Women Forum", value: 164, color: "#A855F7" },
];

// Activity feed
export const activityFeed = [
  { id: 1, type: "registration", message: "Rohit Verma registered for Design Forward 2026", time: "2 min ago", avatar: "RV" },
  { id: 2, type: "payment", message: "Payment confirmed for Ananya Das – ₹499", time: "8 min ago", avatar: "AD" },
  { id: 3, type: "registration", message: "Nikhil Agarwal registered for FinTech Innovations", time: "23 min ago", avatar: "NA" },
  { id: 4, type: "cancellation", message: "Sanjay Iyer cancelled Tech Summit registration", time: "1 hr ago", avatar: "SI" },
  { id: 5, type: "payment", message: "Payment confirmed for Priya Menon – ₹1,999", time: "2 hr ago", avatar: "PM" },
  { id: 6, type: "event", message: "New event 'Women in Leadership Forum' published", time: "3 hr ago", avatar: "AL" },
];

// Computed KPIs
export const getKPIs = () => {
  const totalRevenue = transactionsData
    .filter(t => t.status === "success")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalRegistrations = participantsData.filter(p => p.status !== "cancelled").length;
  const totalEvents = eventsData.length;
  const avgConversion = Math.round((totalRegistrations / eventsData.reduce((sum, e) => sum + e.capacity, 0)) * 100);
  
  return {
    totalRevenue,
    totalRegistrations,
    totalEvents,
    avgConversion,
  };
};

// Format currency
export const formatCurrency = (amount) => {
  if (amount === 0) return "Free";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Seats remaining
export const getSeatsLeft = (event) => event.capacity - event.registered;
