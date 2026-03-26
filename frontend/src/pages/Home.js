import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="home-page">
      <div className="dashboard-shell">
        <header className="dashboard-topbar">
          <div className="top-links">
            <button type="button" className="top-link active">
              Home
            </button>
            <button type="button" className="top-link">
              Dashboard
            </button>
            <button type="button" className="top-link">
              Settings
            </button>
          </div>
          <div className="top-actions">
            <button type="button" className="icon-btn" aria-label="Notifications">
              o
            </button>
            <div className="avatar-circle">{user.name?.[0] || "U"}</div>
          </div>
        </header>

        <section className="welcome-band">
          <h1>Welcome to YourApp!</h1>
          <p>Hello, {user.name}!</p>
        </section>

        <section className="stats-row">
          <article className="stat-card">
            <div>
              <p className="stat-label">Total Projects</p>
              <h2>12</h2>
              <span className="stat-sub">Active</span>
            </div>
            <span className="stat-dot" />
          </article>
          <article className="stat-card">
            <div>
              <p className="stat-label">Tasks Completed</p>
              <h2>87</h2>
              <span className="stat-sub">This Week</span>
            </div>
            <span className="stat-dot" />
          </article>
        </section>

        <section className="dashboard-grid">
          <article className="panel-card">
            <h3>Recent Activities</h3>
            <ul className="list-lines">
              <li>New comment on "Project Alpha"</li>
              <li>Task "Design Mockup" completed.</li>
              <li>New file uploaded: "Report.pdf"</li>
              <li>Meeting scheduled for 2:00 PM.</li>
            </ul>
          </article>

          <article className="panel-card">
            <h3>Your Tasks</h3>
            <ul className="task-list">
              <li>
                <span>Finish Landing Page</span>
                <em className="pill pending">Pending</em>
              </li>
              <li>
                <span>Update Project Doc.</span>
                <em className="pill progress">In Progress</em>
              </li>
              <li>
                <span>Team Meeting at PM</span>
                <em className="pill upcoming">Upcoming</em>
              </li>
            </ul>
          </article>
        </section>

        <section className="dashboard-grid">
          <article className="panel-card skeleton-card">
            <div className="skeleton-line short" />
            <div className="skeleton-line" />
            <div className="skeleton-line medium" />
          </article>

          <article className="panel-card">
            <h3>Announcements</h3>
            <div className="announcement">Weekly update meeting tomorrow</div>
            <div className="announcement">
              New features released!
              <span>Check out the blog for details.</span>
            </div>
            <button className="logout-link" onClick={handleLogout}>
              Logout
            </button>
          </article>
        </section>
      </div>
    </div>
  );
}

export default Home;
