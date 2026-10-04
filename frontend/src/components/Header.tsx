import React from 'react';
import '../styles/Header.css';

interface HeaderProps {
  onRegisterClick?: () => void;
  onLoginClick?: () => void;
}

export default function Header({ onRegisterClick, onLoginClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1 className="logo-text">CLAUDE CAMPUSX</h1>
          <p className="logo-subtitle">Split Expenses</p>
        </div>
        <nav className="header-nav">
          <ul className="nav-list">
            <li><a href="/" className="nav-link active">Home</a></li>
            <li><a href="/expenses" className="nav-link">Expenses</a></li>
            <li><a href="/settings" className="nav-link">Settings</a></li>
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
