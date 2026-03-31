import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved
      ? JSON.parse(saved)
      : [
          { id: Date.now(), text: "Setup JWT authentication", done: true },
          { id: Date.now() + 1, text: "Build reusable login component", done: true },
          { id: Date.now() + 2, text: "Integrate protected routes", done: false },
        ];
  });
  const [todoInput, setTodoInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const t = todoInput.trim();
    if (!t) return;
    setTodos([...todos, { id: Date.now(), text: t, done: false }]);
    setTodoInput("");
  };
  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));
  const toggleTodo = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };
  const saveEdit = (id) => {
    const t = editText.trim();
    if (!t) return;
    setTodos(todos.map((x) => (x.id === id ? { ...x, text: t } : x)));
    setEditId(null);
    setEditText("");
  };
  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("todos");
    navigate("/login");
  };

  if (!user) return null;

  const doneCount = todos.filter((t) => t.done).length;
  const pendingCount = todos.length - doneCount;
  const pct = todos.length ? Math.round((doneCount / todos.length) * 100) : 0;
  const initials = (user.name || "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join("");
  const filtered =
    filter === "all"
      ? todos
      : filter === "done"
        ? todos.filter((t) => t.done)
        : todos.filter((t) => !t.done);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="hp">
      {/* ── Top bar ── */}
      <header className="hp-topbar">
        <span className="hp-logo">TaskPilot</span>
        <div className="hp-topbar-right">
          <div className="hp-user-pill">
            <span className="hp-avatar">{initials}</span>
            <span className="hp-user-name">{user.name}</span>
          </div>
          <button className="hp-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="hp-body">
        {/* ── Left column ── */}
        <div className="hp-left">
          {/* Welcome */}
          <section className="hp-welcome">
            <h1>{greeting}, {user.name}</h1>
            <p>You have <strong>{pendingCount}</strong> pending {pendingCount === 1 ? "task" : "tasks"} today.</p>
          </section>

          {/* Metrics */}
          <section className="hp-metrics">
            <div className="hp-metric">
              <span className="hp-metric-val">{todos.length}</span>
              <span className="hp-metric-lbl">Total</span>
            </div>
            <div className="hp-metric hp-metric-green">
              <span className="hp-metric-val">{doneCount}</span>
              <span className="hp-metric-lbl">Done</span>
            </div>
            <div className="hp-metric hp-metric-amber">
              <span className="hp-metric-val">{pendingCount}</span>
              <span className="hp-metric-lbl">Pending</span>
            </div>
            <div className="hp-metric">
              <span className="hp-metric-val">{pct}%</span>
              <span className="hp-metric-lbl">Progress</span>
            </div>
          </section>

          {/* Progress bar */}
          <section className="hp-progress-section">
            <div className="hp-progress-head">
              <span>Overall Progress</span>
              <span>{pct}%</span>
            </div>
            <div className="hp-progress-track">
              <div className="hp-progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </section>

          {/* Todo board */}
          <section className="hp-card hp-todos">
            <div className="hp-card-header">
              <h2>My Tasks</h2>
              <div className="hp-filters">
                {["all", "active", "done"].map((f) => (
                  <button
                    key={f}
                    className={`hp-filter ${filter === f ? "on" : ""}`}
                    onClick={() => setFilter(f)}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="hp-add-row">
              <input
                className="hp-add-input"
                placeholder="What needs to be done?"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
              />
              <button className="hp-add-btn" onClick={addTodo}>Add</button>
            </div>

            <ul className="hp-task-list">
              {filtered.map((todo) => (
                <li key={todo.id} className={`hp-task ${todo.done ? "hp-task-done" : ""}`}>
                  <label className="hp-check-wrap">
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <span className="hp-checkmark" />
                  </label>

                  {editId === todo.id ? (
                    <div className="hp-edit-row">
                      <input
                        className="hp-edit-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
                        autoFocus
                      />
                      <button className="hp-btn green" onClick={() => saveEdit(todo.id)}>Save</button>
                      <button className="hp-btn gray" onClick={cancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <>
                      <span className="hp-task-text">{todo.text}</span>
                      <span className={`hp-pill ${todo.done ? "hp-pill-done" : "hp-pill-pending"}`}>
                        {todo.done ? "Completed" : "Pending"}
                      </span>
                      <div className="hp-task-actions">
                        <button className="hp-btn blue" onClick={() => startEdit(todo)}>Edit</button>
                        <button className="hp-btn red" onClick={() => deleteTodo(todo.id)}>Delete</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="hp-task-empty">No tasks to show.</li>
              )}
            </ul>
          </section>
        </div>

        {/* ── Right column ── */}
        <div className="hp-right">
          {/* Profile card */}
          <section className="hp-card hp-profile">
            <div className="hp-profile-top">
              <div className="hp-profile-avatar">{initials}</div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <div className="hp-profile-stats">
              <div>
                <strong>{todos.length}</strong>
                <span>Tasks</span>
              </div>
              <div>
                <strong>{doneCount}</strong>
                <span>Done</span>
              </div>
              <div>
                <strong>{pct}%</strong>
                <span>Rate</span>
              </div>
            </div>
          </section>

          {/* Quick info */}
          <section className="hp-card">
            <h2>Quick Info</h2>
            <ul className="hp-info-list">
              <li>
                <span className="hp-info-dot blue" />
                <span>Joined March 2026</span>
              </li>
              <li>
                <span className="hp-info-dot green" />
                <span>{doneCount} tasks completed this week</span>
              </li>
              <li>
                <span className="hp-info-dot amber" />
                <span>{pendingCount} tasks remaining</span>
              </li>
            </ul>
          </section>

          {/* Streak */}
          <section className="hp-card hp-streak">
            <h2>Streak</h2>
            <div className="hp-streak-num">{doneCount}</div>
            <p>tasks crushed so far</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
