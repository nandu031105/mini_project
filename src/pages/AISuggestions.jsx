import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth} from "../context/AuthContext";
import { setTasks } from "../redux/taskSlice";
import GlassBackground from "../components/GlassBackground";
import Navbar from "../components/Navbar";
const AISuggestions = () => {
  const { user } = useAuth();
  const { items: tasks } = useSelector((state) => state.tasks);
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

useEffect(() => {
  if (!user) return;
  const stored = localStorage.getItem(`tasks_${user.uid}`);
  if (stored) {
    dispatch(setTasks(JSON.parse(stored)));
  }else{
    dispatch(setTasks([]));
  }
}, [user]);

const pending = tasks.filter((t) => !t.completed);
const completed = tasks.filter((t) => t.completed);

const getAISuggestions = async () => {
  if (tasks.length === 0) {
    setError("Please add some tasks first!");
    return;
  }
  setLoading(true);
  setError(null);
  setSuggestions(null);

  await new Promise((res) => setTimeout(res, 2000));

  setSuggestions({
    greeting: "You have " + pending.length + " pending tasks. Let's make a smart plan!",
    priority_order: pending.slice(0, 3).map(t => t.title),
    daily_plan: [
      { day: "Today", focus: "Focus on high priority tasks", tasks: pending.filter(t => t.priority === "High").map(t => t.title).slice(0, 2) },
      { day: "Tomorrow", focus: "Work on medium priority tasks", tasks: pending.filter(t => t.priority === "Medium").map(t => t.title).slice(0, 2) },
      { day: "This Week", focus: "Complete remaining tasks", tasks: pending.filter(t => t.priority === "Low").map(t => t.title).slice(0, 2) },
    ],
    tips: [
      "Use Pomodoro technique — study 25 mins, break 5 mins",
      "Tackle your hardest subject when your energy is highest",
      "Review notes within 24 hours to boost retention by 60%",
    ],
    warning: pending.length > 3 ? "You have many pending tasks! Start with high priority ones immediately." : null,
  });

  setLoading(false);
};


  return (
    <div className="ai-page">
      <GlassBackground />
      <Navbar />

      <div className="ai-content">

        {/* ── Header ── */}
        <div className="ai-header">
          <div className="ai-badge">🤖 Powered by Claude AI</div>
          <h1 className="ai-title">AI Study Suggestions</h1>
          <p className="ai-sub">
            Let AI analyze your {tasks.length} tasks and build a personalized study plan for you
          </p>
        </div>

        {/* ── Task Summary ── */}
        <div className="task-summary-row">
          <div className="summary-pill">
            <span className="sp-num">{tasks.length}</span>
            <span className="sp-lbl">Total Tasks</span>
          </div>
          <div className="summary-pill pending-pill">
            <span className="sp-num">{pending.length}</span>
            <span className="sp-lbl">Pending</span>
          </div>
          <div className="summary-pill done-pill">
            <span className="sp-num">{completed.length}</span>
            <span className="sp-lbl">Completed</span>
          </div>
        </div>

        {/* ── Generate Button ── */}
        <div className="generate-section">
          <button
            className={`generate-btn ${loading ? "loading" : ""}`}
            onClick={getAISuggestions}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Analyzing your workload...
              </>
            ) : (
              <>✨ Generate My Study Plan</>
            )}
          </button>
          {pending.length === 0 && tasks.length > 0 && (
            <p className="all-done-msg">🎉 All tasks completed! Add new tasks to get suggestions.</p>
          )}
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="error-box">⚠️ {error}</div>
        )}

        {/* ── AI Results ── */}
        {suggestions && (
          <div className="suggestions-wrapper">

            {/* Greeting */}
            <div className="greeting-card">
              <span className="greeting-icon">🤖</span>
              <p className="greeting-text">{suggestions.greeting}</p>
            </div>

            {/* Warning if any */}
            {suggestions.warning && (
              <div className="warning-card">
                <span>⚠️</span>
                <p>{suggestions.warning}</p>
              </div>
            )}

            {/* Priority Order */}
            <div className="section-block">
              <h3 className="block-title">📋 Recommended Priority Order</h3>
              <div className="priority-list">
                {suggestions.priority_order.map((task, i) => (
                  <div className="priority-item" key={i}>
                    <span className="priority-num">{i + 1}</span>
                    <span className="priority-task">{task}</span>
                    {i === 0 && <span className="priority-badge">Start Here</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Plan */}
            <div className="section-block">
              <h3 className="block-title">📅 Your Study Schedule</h3>
              <div className="daily-grid">
                {suggestions.daily_plan.map((day, i) => (
                  <div className="day-card" key={i}>
                    <div className="day-header">
                      <span className="day-label">{day.day}</span>
                    </div>
                    <p className="day-focus">{day.focus}</p>
                    <ul className="day-tasks">
                      {day.tasks.map((t, j) => (
                        <li key={j}>📌 {t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="section-block">
              <h3 className="block-title">💡 Personalized Study Tips</h3>
              <div className="tips-list">
                {suggestions.tips.map((tip, i) => (
                  <div className="tip-card" key={i}>
                    <span className="tip-num">0{i + 1}</span>
                    <p className="tip-text">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .ai-page { min-height: 100vh; font-family: 'Outfit', sans-serif; }

        .ai-content {
          max-width: 860px;
          margin: 0 auto;
          padding: 110px 24px 80px;
        }

        /* ── Header ── */
        .ai-header {
          text-align: center;
          margin-bottom: 36px;
          animation: fadeUp 0.6s ease both;
        }

        .ai-badge {
          display: inline-block;
          background: rgba(155,109,255,0.15);
          border: 1px solid rgba(155,109,255,0.3);
          color: #c4a8ff;
          padding: 6px 18px;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }

        .ai-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 700;
          color: #fff;
          margin: 0 0 10px;
          letter-spacing: -0.03em;
        }

        .ai-sub {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.45);
          margin: 0;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ── Task Summary ── */
        .task-summary-row {
          display: flex;
          gap: 14px;
          justify-content: center;
          margin-bottom: 32px;
          flex-wrap: wrap;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.05s;
        }

        .summary-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 16px 28px;
          min-width: 100px;
        }

        .pending-pill { border-color: rgba(249,115,22,0.25); background: rgba(249,115,22,0.07); }
        .done-pill    { border-color: rgba(62,207,142,0.25); background: rgba(62,207,142,0.07); }

        .sp-num {
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }
        .pending-pill .sp-num { color: #f97316; }
        .done-pill .sp-num    { color: #3ecf8e; }
        .sp-lbl { font-size: 0.78rem; color: rgba(255,255,255,0.4); }

        /* ── Generate Button ── */
        .generate-section {
          text-align: center;
          margin-bottom: 32px;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.1s;
        }

        .generate-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 36px;
          border-radius: 14px;
          background: linear-gradient(135deg, #7c3aed, #4f8ef7);
          color: #fff;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 4px 24px rgba(124,58,237,0.35);
        }

        .generate-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(124,58,237,0.5);
        }

        .generate-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          flex-shrink: 0;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .all-done-msg {
          margin-top: 14px;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.4);
        }

        /* ── Error ── */
        .error-box {
          background: rgba(244,63,94,0.1);
          border: 1px solid rgba(244,63,94,0.3);
          border-radius: 12px;
          padding: 14px 20px;
          color: #fb7185;
          font-size: 0.9rem;
          margin-bottom: 24px;
          text-align: center;
        }

        /* ── Suggestions ── */
        .suggestions-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: fadeUp 0.5s ease both;
        }

        /* Greeting */
        .greeting-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: linear-gradient(135deg, rgba(124,58,237,0.12), rgba(79,142,247,0.08));
          border: 1px solid rgba(124,58,237,0.25);
          border-radius: 18px;
          padding: 22px 24px;
        }
        .greeting-icon { font-size: 1.6rem; flex-shrink: 0; }
        .greeting-text { font-size: 1rem; color: rgba(255,255,255,0.75); margin: 0; line-height: 1.6; }

        /* Warning */
        .warning-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: rgba(249,115,22,0.1);
          border: 1px solid rgba(249,115,22,0.3);
          border-radius: 14px;
          padding: 16px 20px;
          color: #fb923c;
          font-size: 0.9rem;
        }
        .warning-card p { margin: 0; }

        /* Section Block */
        .section-block {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 26px;
        }

        .block-title {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 18px;
        }

        /* Priority List */
        .priority-list { display: flex; flex-direction: column; gap: 10px; }

        .priority-item {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 12px 16px;
          transition: transform 0.2s;
        }
        .priority-item:hover { transform: translateX(4px); }

        .priority-num {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: linear-gradient(135deg, #7c3aed, #4f8ef7);
          color: #fff;
          font-size: 0.82rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .priority-task { font-size: 0.92rem; color: rgba(255,255,255,0.8); flex: 1; }

        .priority-badge {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 999px;
          background: rgba(62,207,142,0.15);
          color: #3ecf8e;
          border: 1px solid rgba(62,207,142,0.3);
        }

        /* Daily Grid */
        .daily-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
        }

        .day-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 18px;
          transition: transform 0.2s;
        }
        .day-card:hover { transform: translateY(-3px); }

        .day-header { margin-bottom: 10px; }
        .day-label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #7eb3ff;
        }

        .day-focus {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
          margin: 0 0 12px;
          line-height: 1.5;
        }

        .day-tasks {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .day-tasks li {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.5);
        }

        /* Tips */
        .tips-list { display: flex; flex-direction: column; gap: 12px; }

        .tip-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          transition: transform 0.2s;
        }
        .tip-card:hover { transform: translateX(4px); }

        .tip-num {
          font-size: 0.78rem;
          font-weight: 700;
          color: #c4a8ff;
          font-family: 'JetBrains Mono', monospace;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .tip-text {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.65);
          margin: 0;
          line-height: 1.55;
        }

        /* ── Animation ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .daily-grid { grid-template-columns: 1fr; }
          .task-summary-row { gap: 10px; }
        }
      `}</style>
    </div>
  );
};

export default AISuggestions;