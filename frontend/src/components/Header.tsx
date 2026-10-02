import React from 'react';
import '../styles/Header.css';

export default function Header() {
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
