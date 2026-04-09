import { useState } from "react";
import { NavLink ,useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth } from "../firebase/FireBaseConfig";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <>
      <nav className="navbar-glass">
        <div className="nav-logo">
          <span className="nav-logo-icon">📚</span>
          <span className="nav-logo-text">StudySync <span className="nav-logo-ai">AI</span></span>
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <span className="nav-icon">🏠</span> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <span className="nav-icon">📋</span> Tasks
            </NavLink>
          </li>
          <li>
            <NavLink to="/progress" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <span className="nav-icon">📈</span> Progress
            </NavLink>
          </li>
          <li>
          <NavLink to="/ai" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
           <span className="nav-icon">🤖</span> AI Tips
          </NavLink>
        y</li>
        </ul>

        <div className="nav-right">
          {user && (
            <div className="nav-avatar">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          )}
          <button className="nav-signout-btn" onClick={handleSignOut}>
            Sign Out
          </button>
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="nav-mobile-menu">
          <NavLink to="/home" className="mobile-link" onClick={() => setMenuOpen(false)}>🏠 Dashboard</NavLink>
          <NavLink to="/tasks" className="mobile-link" onClick={() => setMenuOpen(false)}>📋 Tasks</NavLink>
          <NavLink to="/progress" className="mobile-link" onClick={() => setMenuOpen(false)}>📈 Progress</NavLink>
          <button className="mobile-signout" onClick={handleSignOut}>Sign Out</button>
        </div>
      )}

      <style>{`
        .navbar-glass {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 48px);
          max-width: 1100px;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          animation: navSlideDown 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .nav-logo { display: flex; align-items: center; gap: 8px; }
        .nav-logo-icon { font-size: 1.4rem; }
        .nav-logo-text { font-size: 1.1rem; font-weight: 700; color: #fff; font-family: 'Outfit', sans-serif; letter-spacing: -0.02em; }
        .nav-logo-ai { color: #4f8ef7; }
        .nav-links { display: flex; align-items: center; gap: 4px; list-style: none; margin: 0; padding: 0; }
        .nav-link { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 10px; font-size: 0.9rem; font-weight: 500; font-family: 'Outfit', sans-serif; color: rgba(255,255,255,0.55); text-decoration: none; transition: all 0.2s ease; }
        .nav-link:hover { color: #fff; background: rgba(255,255,255,0.08); }
        .nav-link.active { color: #fff; background: rgba(79,142,247,0.2); border: 1px solid rgba(79,142,247,0.3); }
        .nav-right { display: flex; align-items: center; gap: 12px; }
        .nav-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #4f8ef7, #7c3aed); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 700; color: #fff; font-family: 'Outfit', sans-serif; border: 2px solid rgba(255,255,255,0.15); }
        .nav-signout-btn { padding: 8px 18px; border-radius: 10px; border: 1px solid rgba(248,113,113,0.4); background: rgba(248,113,113,0.1); color: #f87171; font-size: 0.88rem; font-weight: 600; font-family: 'Outfit', sans-serif; cursor: pointer; transition: all 0.2s ease; }
        .nav-signout-btn:hover { background: rgba(248,113,113,0.22); color: #fff; transform: translateY(-1px); }
        .nav-hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
        .ham-line { display: block; width: 22px; height: 2px; background: rgba(255,255,255,0.7); border-radius: 99px; }
        .nav-mobile-menu { position: fixed; top: 80px; left: 50%; transform: translateX(-50%); width: calc(100% - 48px); max-width: 1100px; z-index: 99; display: flex; flex-direction: column; gap: 8px; padding: 16px; border-radius: 18px; background: rgba(15,18,35,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); }
        .mobile-link { padding: 12px 16px; border-radius: 10px; color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.95rem; font-family: 'Outfit', sans-serif; font-weight: 500; }
        .mobile-link:hover { background: rgba(255,255,255,0.07); color: #fff; }
        .mobile-signout { padding: 12px 16px; border-radius: 10px; border: 1px solid rgba(248,113,113,0.3); background: rgba(248,113,113,0.1); color: #f87171; font-size: 0.95rem; font-family: 'Outfit', sans-serif; font-weight: 600; cursor: pointer; text-align: left; }
        @media (max-width: 640px) {
          .nav-links { display: none; }
          .nav-signout-btn { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>
    </>
  );
};

export default Navbar;