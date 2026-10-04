import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import { getCurrentUser, setCurrentUser } from './services/authService';
import type { LoggedInUser } from './services/expenseService';
import './styles/Layout.css';
import './App.css';

function AppContent() {
  const navigate = useNavigate();
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentUser, setCurrentUserState] = useState(getCurrentUser());
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUserState(user);
  }, []);

  const handleRegistered = () => {
    setRegisterOpen(false);
    setRefreshKey((k) => k + 1);
    toast.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: 'User registered successfully!',
      life: 3000,
    });
  };

  const handleLoggedIn = (user: LoggedInUser) => {
    setCurrentUser(user);
    setCurrentUserState(user);
    setLoginOpen(false);
    setRefreshKey((k) => k + 1);
    toast.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: `Welcome, ${user.username}!`,
      life: 3000,
    });
    navigate('/profile');
  };

  return (
    <div className="layout">
      <Toast ref={toast} />
      <Header
        onRegisterClick={() => setRegisterOpen(true)}
        onLoginClick={() => setLoginOpen(true)}
        currentUser={currentUser}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              refreshKey={refreshKey}
              onRegistered={handleRegistered}
              onLoggedIn={handleLoggedIn}
              registerOpen={registerOpen}
              loginOpen={loginOpen}
              onRegisterOpen={setRegisterOpen}
              onLoginOpen={setLoginOpen}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
