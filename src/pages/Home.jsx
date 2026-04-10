import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GlassBackground from "../components/GlassBackground";
import Navbar from "../components/Navbar";
const features = [
  {
    icon: "📋",
    title: "Task Management",
    desc: "Add, edit, and delete your assignments, projects, and study tasks all in one place.",
  },
  {
    icon: "⏰",
    title: "Deadline Tracking",
    desc: "Never miss a deadline. Set due dates and priority levels for every task.",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    desc: "Visualize how much you've completed and what's remaining with progress bars.",
  },
  {
    icon: "🤖",
    title: "AI Study Suggestions",
    desc: "Get personalized AI-powered tips on what to study first based on your workload.",
  },
];

const quotes = [
  "The secret of getting ahead is getting started. — Mark Twain",
  "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "You don't have to be great to start, but you have to start to be great.",
];

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const userName = user?.displayName ;
  return (
    <div className="home-page">
      <GlassBackground />
      <Navbar />

      <div className="home-content">

        {/* ── Hero / Welcome ── */}
        <div className="hero-section">
          <p className="hero-badge">👋Welcome  </p>
          <h1 className="hero-title">
            Hello, <span className="hero-name">{userName}</span>!
          </h1>
          <p className="hero-subtitle">
            Ready to crush your study goals today? Here's everything you need to manage your workload.
          </p>

          {/* Motivational Quote */}
          <div className="quote-box">
            <span className="quote-icon">💬</span>
            <p className="quote-text">"{randomQuote}"</p>
          </div>
        </div>

  
        <div className="section-header">
          <h2 className="section-title">How to Use StudySync AI</h2>
          <p className="section-sub">Everything you need in 4 simple steps</p>
        </div>

        <div className="steps-row">
          <div className="step-card">
            <div className="step-num">01</div>
            <div className="step-icon">✍️</div>
            <h3 className="step-title">Add Your Tasks</h3>
            <p className="step-desc">Go to the <strong>Tasks</strong> page and add your assignments with subject, deadline, and priority.</p>
          </div>
          <div className="step-card">
            <div className="step-num">02</div>
            <div className="step-icon">🎯</div>
            <h3 className="step-title">Set Priorities</h3>
            <p className="step-desc">Mark tasks as High, Medium, or Low priority so you always know what needs attention first.</p>
          </div>
          <div className="step-card">
            <div className="step-num">03</div>
            <div className="step-icon">📊</div>
            <h3 className="step-title">Track Progress</h3>
            <p className="step-desc">Visit the <strong>Progress</strong> page to see how much you've completed and what's left.</p>
          </div>
          <div className="step-card">
            <div className="step-num">04</div>
            <div className="step-icon">🤖</div>
            <h3 className="step-title">Get AI Tips</h3>
            <p className="step-desc">Let our AI analyze your tasks and suggest a smart study plan tailored to your schedule.</p>
          </div>
        </div>

        {/* ── Features ── */}
        <div className="section-header" style={{ marginTop: "60px" }}>
          <h2 className="section-title">What Can You Do Here?</h2>
          <p className="section-sub">Your all-in-one student workload manager</p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="cta-box">
          <h3 className="cta-title">Ready to get started? 🚀</h3>
          <p className="cta-sub">Add your first task and take control of your study schedule.</p>
          <button className="cta-btn" onClick={() => navigate("/tasks")}>
            Go to Tasks →
          </button>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .home-page {
          min-height: 100vh;
          font-family: 'Outfit', sans-serif;
        }

        .home-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 120px 24px 80px;
        }

        /* ── Hero ── */
        .hero-section {
          text-align: center;
          margin-bottom: 70px;
          animation: fadeUp 0.7s ease both;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(79,142,247,0.15);
          border: 1px solid rgba(79,142,247,0.3);
          color: #7eb3ff;
          padding: 6px 18px;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .hero-title {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 14px;
          letter-spacing: -0.03em;
          line-height: 1.15;
        }

        .hero-name {
          background: linear-gradient(135deg, #4f8ef7, #9b6dff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.5);
          max-width: 520px;
          margin: 0 auto 28px;
          line-height: 1.7;
        }

        /* ── Quote ── */
        .quote-box {
          display: inline-flex;
          align-items: flex-start;
          gap: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 14px;
          padding: 16px 24px;
          max-width: 600px;
          margin: 0 auto;
          text-align: left;
        }

        .quote-icon { font-size: 1.2rem; margin-top: 2px; flex-shrink: 0; }

        .quote-text {
          font-size: 0.92rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
          margin: 0;
          font-style: italic;
        }

        /* ── Section Header ── */
        .section-header {
          text-align: center;
          margin-bottom: 36px;
          animation: fadeUp 0.7s ease both;
          animation-delay: 0.1s;
        }

        .section-title {
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .section-sub {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.4);
          margin: 0;
        }

        /* ── Steps ── */
        .steps-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          animation: fadeUp 0.7s ease both;
          animation-delay: 0.15s;
        }

        .step-card {
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 28px 24px;
          transition: transform 0.25s ease, border-color 0.25s ease;
          overflow: hidden;
        }

        .step-card:hover {
          transform: translateY(-4px);
          border-color: rgba(79,142,247,0.35);
        }

        .step-num {
          position: absolute;
          top: 16px;
          right: 20px;
          font-size: 2.5rem;
          font-weight: 800;
          color: rgba(255,255,255,0.04);
          line-height: 1;
        }

        .step-icon {
          font-size: 1.8rem;
          margin-bottom: 14px;
        }

        .step-title {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .step-desc {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
          margin: 0;
        }

        .step-desc strong {
          color: #7eb3ff;
          font-weight: 500;
        }

        /* ── Features ── */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          animation: fadeUp 0.7s ease both;
          animation-delay: 0.2s;
        }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 28px 24px;
          transition: transform 0.25s ease, border-color 0.25s, background 0.25s;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          background: rgba(79,142,247,0.06);
          border-color: rgba(79,142,247,0.25);
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 14px;
        }

        .feature-title {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .feature-desc {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
          margin: 0;
        }

        /* ── CTA ── */
        .cta-box {
          margin-top: 60px;
          text-align: center;
          background: linear-gradient(135deg, rgba(79,142,247,0.12), rgba(155,109,255,0.1));
          border: 1px solid rgba(79,142,247,0.2);
          border-radius: 24px;
          padding: 48px 32px;
          animation: fadeUp 0.7s ease both;
          animation-delay: 0.25s;
        }

        .cta-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 10px;
        }

        .cta-sub {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.45);
          margin-bottom: 28px;
        }

        .cta-btn {
          background: linear-gradient(135deg, #4f8ef7, #7c3aed);
          color: #fff;
          border: none;
          padding: 14px 32px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 20px rgba(79,142,247,0.3);
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(79,142,247,0.45);
        }

        /* ── Animation ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .home-content { padding: 100px 16px 60px; }
          .steps-row { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Home;