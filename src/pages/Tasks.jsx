import { useAuth } from "../context/AuthContext";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks} from "../redux/taskSlice"
import GlassBackground from "../components/GlassBackground";
import Navbar from "../components/Navbar";



const PRIORITIES = ["High", "Medium", "Low"];
const FILTERS = ["All", "Pending", "Completed", "High", "Medium", "Low"];
const emptyForm = {
  title: "",
  subject: "",
  deadline: "",
  priority: "Medium",
};

const Tasks = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { items: tasks } = useSelector((state) => state.tasks);

  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");

  // ── Load from localStorage ──
useEffect(() => {
  if (!user) return;
  const stored = localStorage.getItem(`tasks_${user.uid}`);
  if (stored) {
    dispatch(setTasks(JSON.parse(stored)));
  }else{
    dispatch(setTasks([]));
  }
}, [user]);

// ── Save to localStorage on every change ──
useEffect(() => {
  if (!user) return;
  if (tasks.length === 0) return;
  localStorage.setItem(`tasks_${user.uid}`, JSON.stringify(tasks));
}, [tasks, user]);
  

// ── Add or Edit Task ──
const handleSubmit = () => {
  if (!form.title || !form.subject || !form.deadline) {
    alert("Please fill all fields!");
    return;
  }

  let updatedTasks;

  if (editId) {
    updatedTasks = tasks.map((t) =>
      t.id === editId ? { ...t, ...form } : t
    );
    setEditId(null);
  } else {
    const newTask = {
      id: Date.now().toString(),
      ...form,
      uid: user.uid,
      completed: false,
      createdAt: Date.now(),
    };
    updatedTasks = [newTask, ...tasks];
  }

  dispatch(setTasks(updatedTasks));
  setForm(emptyForm);
  setShowForm(false);
};

// ── Delete Task ──
const handleDelete = (id) => {
  if (window.confirm("Delete this task?")) {
    dispatch(setTasks(tasks.filter((t) => t.id !== id)));
  }
};

// ── Toggle Complete ──
const handleToggle = (id) => {
  dispatch(
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    )
  );
};

// ── Start Edit ──
const handleEdit = (task) => {
  setForm({
    title: task.title,
    subject: task.subject,
    deadline: task.deadline,
    priority: task.priority,
  });
  setEditId(task.id);
  setShowForm(true);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// ── Filter Logic ──
const filtered = tasks.filter((t) => {
  if (filter === "All") return true;
  if (filter === "Completed") return t.completed;
  if (filter === "Pending") return !t.completed;
  return t.priority === filter;
});

const priorityColor = (p) => {
  if (p === "High") return "#f43f5e";
  if (p === "Medium") return "#f97316";
  return "#3ecf8e";
};
    

  

  return (
    <div className="tasks-page">
      <GlassBackground />
      <Navbar />

      <div className="tasks-content">

        {/* ── Header ── */}
        <div className="tasks-header">
          <div>
            <h1 className="tasks-title">My Tasks</h1>
            <p className="tasks-sub">{tasks.length} total · {tasks.filter(t => t.completed).length} completed</p>
          </div>
          <button className="add-task-btn" onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); }}>
            {showForm ? "✕ Cancel" : "+ Add Task"}
          </button>
        </div>

        {/* ── Add / Edit Form ── */}
        {showForm && (
          <div className="task-form-card">
            <h3 className="form-title">{editId ? "✏️ Edit Task" : "➕ New Task"}</h3>
            <div className="form-grid">
              <input
                className="task-input"
                placeholder="Task title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                className="task-input"
                placeholder="Subject (e.g. Math, Physics)"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
              <input
                className="task-input"
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              />
              <select
                className="task-input"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p} Priority</option>
                ))}
              </select>
            </div>
            <button className="submit-btn" onClick={handleSubmit}>
              {editId ? "Update Task" : "Add Task"}
            </button>
          </div>
        )}

        {/* ── Filter Bar ── */}
        <div className="filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Task List ── */}
        { filtered.length === 0 ? (
          <div className="empty-state">
            <p>📭 No tasks found</p>
            <span>Click "+ Add Task" to get started!</span>
          </div>
        ) : (
          <div className="task-list">
            {filtered.map((task) => (
              <div key={task.id} className={`task-card ${task.completed ? "completed" : ""}`}>

                {/* Left — checkbox + info */}
                <div className="task-left">
                  <button
                    className={`task-check ${task.completed ? "checked" : ""}`}
                    onClick={() => handleToggle(task.id)}
                  >
                    {task.completed ? "✓" : ""}
                  </button>
                  <div className="task-info">
                    <h4 className="task-name">{task.title}</h4>
                    <div className="task-meta">
                      <span className="task-subject">📚 {task.subject}</span>
                      <span className="task-deadline">📅 {task.deadline}</span>
                      <span
                        className="task-priority"
                        style={{ color: priorityColor(task.priority), borderColor: priorityColor(task.priority) }}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right — actions */}
                <div className="task-actions">
                  <button className="action-btn edit-btn" onClick={() => handleEdit(task)}>✏️</button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(task.id)}>🗑️</button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .tasks-page {
          min-height: 100vh;
          font-family: 'Outfit', sans-serif;
        }

        .tasks-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 110px 24px 80px;
        }

        /* ── Header ── */
        .tasks-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .tasks-title {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
          letter-spacing: -0.03em;
        }

        .tasks-sub {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.4);
          margin: 4px 0 0;
        }

        .add-task-btn {
          padding: 10px 22px;
          border-radius: 12px;
          background: linear-gradient(135deg, #4f8ef7, #7c3aed);
          color: #fff;
          border: none;
          font-size: 0.92rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(79,142,247,0.3);
        }

        .add-task-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(79,142,247,0.4);
        }

        /* ── Form ── */
        .task-form-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          padding: 28px;
          margin-bottom: 24px;
          animation: fadeUp 0.3s ease both;
        }

        .form-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 20px;
        }

        .task-input {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          padding: 11px 16px;
          color: #fff;
          font-size: 0.92rem;
          font-family: 'Outfit', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }

        .task-input::placeholder { color: rgba(255,255,255,0.3); }
        .task-input:focus {
          border-color: #4f8ef7;
          box-shadow: 0 0 0 3px rgba(79,142,247,0.18);
        }

        .task-input option { background: #1a1d27; color: #fff; }

        .submit-btn {
          padding: 12px 28px;
          border-radius: 10px;
          background: linear-gradient(135deg, #4f8ef7, #7c3aed);
          color: #fff;
          border: none;
          font-size: 0.95rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .submit-btn:hover { transform: translateY(-2px); }

        /* ── Filter ── */
        .filter-bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .filter-btn {
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.5);
          font-size: 0.85rem;
          font-weight: 500;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover { color: #fff; background: rgba(255,255,255,0.08); }
        .filter-btn.active {
          background: rgba(79,142,247,0.2);
          border-color: rgba(79,142,247,0.4);
          color: #7eb3ff;
        }

        /* ── Task Cards ── */
        .task-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .task-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 18px 20px;
          transition: transform 0.2s, border-color 0.2s;
          animation: fadeUp 0.3s ease both;
        }

        .task-card:hover {
          transform: translateY(-2px);
          border-color: rgba(79,142,247,0.25);
        }

        .task-card.completed {
          opacity: 0.55;
        }

        .task-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
          min-width: 0;
        }

        /* ── Checkbox ── */
        .task-check {
          width: 26px;
          height: 26px;
          border-radius: 8px;
          border: 2px solid rgba(255,255,255,0.2);
          background: transparent;
          color: #3ecf8e;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .task-check.checked {
          background: rgba(62,207,142,0.2);
          border-color: #3ecf8e;
        }

        .task-check:hover { border-color: #3ecf8e; }

        /* ── Task Info ── */
        .task-info { flex: 1; min-width: 0; }

        .task-name {
          font-size: 0.98rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .task-card.completed .task-name {
          text-decoration: line-through;
          color: rgba(255,255,255,0.4);
        }

        .task-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .task-subject, .task-deadline {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
        }

        .task-priority {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 999px;
          border: 1px solid;
          background: transparent;
        }

        /* ── Actions ── */
        .task-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .action-btn {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .edit-btn:hover {
          background: rgba(79,142,247,0.2);
          border-color: rgba(79,142,247,0.4);
        }

        .delete-btn:hover {
          background: rgba(244,63,94,0.2);
          border-color: rgba(244,63,94,0.4);
        }

        /* ── Empty State ── */
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255,255,255,0.3);
          font-size: 1rem;
        }

        .empty-state p { font-size: 1.5rem; margin-bottom: 8px; }
        .empty-state span { font-size: 0.9rem; }

        /* ── Animation ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr; }
          .task-card { flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
};

export default Tasks;