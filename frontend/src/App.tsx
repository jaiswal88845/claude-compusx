import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import Header from './components/Header';
import Footer from './components/Footer';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseList from './components/ExpenseList';
import RegisterUserModal from './components/RegisterUserModal';
import LoginUserModal from './components/LoginUserModal';
import type { LoggedInUser } from './services/expenseService';
import './styles/Layout.css';
import './App.css';

export default function App() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const toast = useRef<Toast>(null);

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
    setLoginOpen(false);
    setRefreshKey((k) => k + 1);
    toast.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: `Welcome, ${user.username}!`,
      life: 3000,
    });
  };

  return (
    <div className="layout">
      <Toast ref={toast} />
      <Header 
        onRegisterClick={() => setRegisterOpen(true)}
        onLoginClick={() => setLoginOpen(true)}
      />

      <main className="layout-main p-grid p-g-3">
        <div className="p-col-12 p-md-4">
          <ExpenseSummary refreshKey={refreshKey} />
        </div>
        <div className="p-col-12 p-md-8">
          <ExpenseList refreshKey={refreshKey} />
        </div>
      </main>

      <Footer />

      <RegisterUserModal
        visible={registerOpen}
        onHide={() => setRegisterOpen(false)}
        onRegistered={handleRegistered}
      />

      <LoginUserModal
        visible={loginOpen}
        onHide={() => setLoginOpen(false)}
        onLoggedIn={handleLoggedIn}
      />
    </div>
  );
}
