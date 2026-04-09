// import { useSelector } from "react-redux";
// import { useAuth } from "../context/AuthContext";
// import { useEffect, useState } from "react";
// import { setTasks } from "../redux/taskSlice";
// import { useDispatch } from "react-redux";
// import GlassBackground from "../components/GlassBackground";
// import Navbar from "../components/Navbar";
  
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { setTasks } from "../redux/taskSlice";
import { useDispatch } from "react-redux";
import GlassBackground from "../components/GlassBackground";
import Navbar from "../components/Navbar";


const Progress = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { items: tasks } = useSelector((state) => state.tasks);
  const [animated, setAnimated] = useState(false);

  // ── Load tasks from localStorage ──
  useEffect(() => {
    if (!user) return;
    const stored = localStorage.getItem(`tasks_${user.uid}`);
    if (stored) dispatch(setTasks(JSON.parse(stored)));
    setTimeout(() => setAnimated(true), 100);
  }, [user]);

  // ── Stats ──
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const high = tasks.filter((t) => t.priority === "High").length;
  const medium = tasks.filter((t) => t.priority === "Medium").length;
  const low = tasks.filter((t) => t.priority === "Low").length;

  const highDone = tasks.filter((t) => t.priority === "High" && t.completed).length;
  const medDone = tasks.filter((t) => t.priority === "Medium" && t.completed).length;
  const lowDone = tasks.filter((t) => t.priority === "Low" && t.completed).length;

  // ── Motivational message ──
  const getMessage = () => {
    if (total === 0) return { text: "No tasks yet. Add some tasks to track your progress!", emoji: "📭" };
    if (percent === 100) return { text: "Outstanding! You've completed everything!", emoji: "🏆" };
    if (percent >= 75) return { text: "Almost there! Keep pushing!", emoji: "🔥" };
    if (percent >= 50) return { text: "Halfway through! Great momentum!", emoji: "💪" };
    if (percent >= 25) return { text: "Good start! Keep going!", emoji: "🚀" };
    return { text: "Let's get started! You can do this!", emoji: "⚡" };
  };

  const msg = getMessage();

  // ── Subject breakdown ──
  const subjects = [...new Set(tasks.map((t) => t.subject))];

  return (
    <div className="progress-page">
      <GlassBackground />
      <Navbar />

      <div className="progress-content">

        {/* ── Header ── */}
        <div className="progress-header">
          <h1 className="progress-title">My Progress</h1>
          <p className="progress-sub">Track your study workload completion</p>
        </div>

        {/* ── Overall Progress Ring + Message ── */}
        <div className="overview-card">
          <div className="ring-section">
            <div className="ring-wrapper">
              <svg viewBox="0 0 120 120" className="ring-svg">
                {/* Background circle */}
                <circle
                  cx="60" cy="60" r="50"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="10"
                />
                {/* Progress circle */}
                <circle
                  cx="60" cy="60" r="50"
                  fill="none"
                  stroke="url(#progressGrad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={animated ? `${2 * Math.PI * 50 * (1 - percent / 100)}` : `${2 * Math.PI * 50}`}
                  transform="rotate(-90 60 60)"
                  style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4f8ef7" />
                    <stop offset="100%" stopColor="#9b6dff" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="ring-center">
                <span className="ring-percent">{percent}%</span>
                <span className="ring-label">Done</span>
              </div>
            </div>
          </div>

          <div className="overview-info">
            <div className="msg-box">
              <span className="msg-emoji">{msg.emoji}</span>
              <p className="msg-text">{msg.text}</p>
            </div>
            <div className="stat-row">
              <div className="stat-pill total">
                <span className="stat-num">{total}</span>
                <span className="stat-lbl">Total</span>
              </div>
              <div className="stat-pill done">
                <span className="stat-num">{completed}</span>
                <span className="stat-lbl">Done</span>
              </div>
              <div className="stat-pill left">
                <span className="stat-num">{pending}</span>
                <span className="stat-lbl">Left</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Priority Breakdown ── */}
        <h2 className="section-title">Priority Breakdown</h2>
        <div className="priority-cards">

          <div className="priority-card high-card">
            <div className="pc-top">
              <span className="pc-icon">🔴</span>
              <span className="pc-label">High Priority</span>
              <span className="pc-count">{highDone}/{high}</span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill high-fill"
                style={{ width: animated ? `${high === 0 ? 0 : (highDone / high) * 100}%` : "0%" }}
              />
            </div>
            <p className="pc-sub">{high === 0 ? "No high priority tasks" : `${Math.round((highDone/high)*100)}% completed`}</p>
          </div>

          <div className="priority-card med-card">
            <div className="pc-top">
              <span className="pc-icon">🟠</span>
              <span className="pc-label">Medium Priority</span>
              <span className="pc-count">{medDone}/{medium}</span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill med-fill"
                style={{ width: animated ? `${medium === 0 ? 0 : (medDone / medium) * 100}%` : "0%" }}
              />
            </div>
            <p className="pc-sub">{medium === 0 ? "No medium priority tasks" : `${Math.round((medDone/medium)*100)}% completed`}</p>
          </div>

          <div className="priority-card low-card">
            <div className="pc-top">
              <span className="pc-icon">🟢</span>
              <span className="pc-label">Low Priority</span>
              <span className="pc-count">{lowDone}/{low}</span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill low-fill"
                style={{ width: animated ? `${low === 0 ? 0 : (lowDone / low) * 100}%` : "0%" }}
              />
            </div>
            <p className="pc-sub">{low === 0 ? "No low priority tasks" : `${Math.round((lowDone/low)*100)}% completed`}</p>
          </div>

        </div>

        {/* ── Subject Breakdown ── */}
        {subjects.length > 0 && (
          <>
            <h2 className="section-title" style={{ marginTop: "40px" }}>Subject Breakdown</h2>
            <div className="subject-list">
              {subjects.map((sub) => {
                const subTotal = tasks.filter((t) => t.subject === sub).length;
                const subDone = tasks.filter((t) => t.subject === sub && t.completed).length;
                const subPercent = Math.round((subDone / subTotal) * 100);
                return (
                  <div className="subject-card" key={sub}>
                    <div className="sub-top">
                      <span className="sub-name">📚 {sub}</span>
                      <span className="sub-stat">{subDone}/{subTotal} · {subPercent}%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div
                        className="progress-bar-fill sub-fill"
                        style={{ width: animated ? `${subPercent}%` : "0%" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── Recent Tasks ── */}
        {tasks.length > 0 && (
          <>
            <h2 className="section-title" style={{ marginTop: "40px" }}>Recent Tasks</h2>
            <div className="recent-list">
              {tasks.slice(0, 5).map((task) => (
                <div className="recent-card" key={task.id}>
                  <div className="recent-left">
                    <span className={`recent-dot ${task.completed ? "dot-done" : "dot-pending"}`} />
                    <div>
                      <p className="recent-title">{task.title}</p>
                      <p className="recent-meta">📚 {task.subject} · 📅 {task.deadline}</p>
                    </div>
                  </div>
                  <span className={`recent-status ${task.completed ? "status-done" : "status-pending"}`}>
                    {task.completed ? "✓ Done" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .progress-page { min-height: 100vh; font-family: 'Outfit', sans-serif; }

        .progress-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 110px 24px 80px;
        }

        /* ── Header ── */
        .progress-header { margin-bottom: 32px; }
        .progress-title {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 6px;
          letter-spacing: -0.03em;
        }
        .progress-sub { font-size: 0.9rem; color: rgba(255,255,255,0.4); margin: 0; }

        /* ── Overview Card ── */
        .overview-card {
          display: flex;
          align-items: center;
          gap: 36px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 24px;
          padding: 32px 36px;
          margin-bottom: 40px;
          flex-wrap: wrap;
          animation: fadeUp 0.6s ease both;
        }

        /* ── Ring ── */
        .ring-section { flex-shrink: 0; }
        .ring-wrapper {
          position: relative;
          width: 140px;
          height: 140px;
        }
        .ring-svg { width: 100%; height: 100%; }
        .ring-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .ring-percent {
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }
        .ring-label {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.4);
          margin-top: 4px;
        }

        /* ── Overview Info ── */
        .overview-info { flex: 1; min-width: 220px; }

        .msg-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 14px 18px;
          margin-bottom: 20px;
        }
        .msg-emoji { font-size: 1.4rem; flex-shrink: 0; }
        .msg-text { font-size: 0.9rem; color: rgba(255,255,255,0.6); margin: 0; line-height: 1.5; }

        .stat-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .stat-pill {
          flex: 1;
          min-width: 70px;
          border-radius: 14px;
          padding: 14px 12px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .stat-num { display: block; font-size: 1.6rem; font-weight: 700; color: #fff; }
        .stat-lbl { display: block; font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-top: 2px; }
        .total { background: rgba(255,255,255,0.04); }
        .done { background: rgba(62,207,142,0.1); border-color: rgba(62,207,142,0.2); }
        .done .stat-num { color: #3ecf8e; }
        .left { background: rgba(249,115,22,0.1); border-color: rgba(249,115,22,0.2); }
        .left .stat-num { color: #f97316; }

        /* ── Section Title ── */
        .section-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 18px;
          letter-spacing: -0.01em;
        }

        /* ── Priority Cards ── */
        .priority-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.1s;
        }

        .priority-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 22px;
          transition: transform 0.2s;
        }
        .priority-card:hover { transform: translateY(-3px); }

        .high-card { border-color: rgba(244,63,94,0.2); }
        .med-card  { border-color: rgba(249,115,22,0.2); }
        .low-card  { border-color: rgba(62,207,142,0.2); }

        .pc-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .pc-icon { font-size: 1.1rem; }
        .pc-label { font-size: 0.92rem; font-weight: 600; color: #fff; flex: 1; }
        .pc-count { font-size: 0.85rem; color: rgba(255,255,255,0.45); }
        .pc-sub { font-size: 0.78rem; color: rgba(255,255,255,0.35); margin: 8px 0 0; }

        /* ── Progress Bars ── */
        .progress-bar-bg {
          width: 100%;
          height: 7px;
          background: rgba(255,255,255,0.07);
          border-radius: 99px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        .high-fill { background: linear-gradient(90deg, #f43f5e, #fb7185); }
        .med-fill  { background: linear-gradient(90deg, #f97316, #fb923c); }
        .low-fill  { background: linear-gradient(90deg, #3ecf8e, #6ee7b7); }
        .sub-fill  { background: linear-gradient(90deg, #4f8ef7, #9b6dff); }

        /* ── Subject List ── */
        .subject-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.15s;
        }

        .subject-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 18px 20px;
          transition: transform 0.2s;
        }
        .subject-card:hover { transform: translateY(-2px); }

        .sub-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .sub-name { font-size: 0.92rem; font-weight: 600; color: #fff; }
        .sub-stat { font-size: 0.8rem; color: rgba(255,255,255,0.4); }

        /* ── Recent Tasks ── */
        .recent-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.2s;
        }

        .recent-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 14px 18px;
          gap: 12px;
          transition: transform 0.2s;
        }
        .recent-card:hover { transform: translateY(-2px); }

        .recent-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
        .recent-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-done    { background: #3ecf8e; }
        .dot-pending { background: #f97316; }

        .recent-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .recent-meta { font-size: 0.78rem; color: rgba(255,255,255,0.35); margin: 0; }

        .recent-status {
          font-size: 0.78rem;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 999px;
          flex-shrink: 0;
        }
        .status-done    { background: rgba(62,207,142,0.15); color: #3ecf8e; }
        .status-pending { background: rgba(249,115,22,0.15); color: #f97316; }

        /* ── Animation ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .overview-card { flex-direction: column; align-items: flex-start; padding: 24px; }
          .priority-cards { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Progress;