import { Link } from 'react-router-dom';
import { logout } from '../services/authService';
import type { LoggedInUser } from '../services/expenseService';
import '../styles/Header.css';

interface HeaderProps {
  onRegisterClick?: () => void;
  onLoginClick?: () => void;
  currentUser?: LoggedInUser | null;
}

export default function Header({ onRegisterClick, onLoginClick, currentUser }: HeaderProps) {
  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1 className="logo-text">CLAUDE CAMPUSX</h1>
          <p className="logo-subtitle">Split Expenses</p>
        </div>
        <nav className="header-nav">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link active">Home</Link></li>
            <li><a href="/expenses" className="nav-link">Expenses</a></li>
            <li><a href="/settings" className="nav-link">Settings</a></li>
            {currentUser ? (
              <>
                <li>
                  <Link to="/profile" className="nav-link nav-button">
                    Profile ({currentUser.username})
                  </Link>
                </li>
                <li>
                  <button
                    className="nav-link nav-button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    className="nav-link nav-button"
                    onClick={onLoginClick}
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    className="nav-link nav-button"
                    onClick={onRegisterClick}
                  >
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
