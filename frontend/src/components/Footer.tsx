import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">© {currentYear} Claude CampusX. All rights reserved.</p>
          <ul className="footer-links">
            <li><a href="#privacy">Privacy</a></li>
            <li><a href="#terms">Terms</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
