import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Divider } from 'primereact/divider';
import { getCurrentUser, logout } from '../services/authService';
import { fetchSummary, fetchExpenses, type UserSummary } from '../services/expenseService';
import '../styles/Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [user] = useState(getCurrentUser());
  const [userStats, setUserStats] = useState<UserSummary | null>(null);
  const [expenseCount, setExpenseCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [summaryData, expensesData] = await Promise.all([
          fetchSummary(),
          fetchExpenses(),
        ]);

        if (user) {
          const stats = summaryData.summary.find((s) => s.user === user.username);
          setUserStats(stats || null);

          const count = expensesData.filter(
            (exp) => exp.paidBy === user.username || exp.participants.some((p) => p.user === user.username)
          ).length;
          setExpenseCount(count);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!user) {
    return (
      <main className="profile-container">
        <div className="p-error p-p-3">No user data found. Please log in again.</div>
      </main>
    );
  }

  const accountCardHeader = (
    <div className="profile-card-header">
      <i className="pi pi-user p-mr-2" />
      Account Information
    </div>
  );

  const statsCardHeader = (
    <div className="profile-card-header">
      <i className="pi pi-chart-bar p-mr-2" />
      Expense Statistics
    </div>
  );

  return (
    <main className="profile-container">
      <div className="p-grid p-g-3">
        {/* Account Info Card */}
        <div className="p-col-12 p-md-6">
          <Card title={accountCardHeader} className="profile-card p-mb-3">
            <div className="account-info">
              <div className="info-row">
                <span className="info-label">Username</span>
                <span className="info-value">{user.username}</span>
              </div>
              <Divider className="p-my-2" />
              <div className="info-row">
                <span className="info-label">Email</span>
                <span className="info-value">{user.email}</span>
              </div>
              <Divider className="p-my-2" />
              <div className="info-row">
                <span className="info-label">User ID</span>
                <span className="info-value">#{user.uid}</span>
              </div>
              <Divider className="p-my-2" />
              <div className="info-row">
                <span className="info-label">Member Since</span>
                <span className="info-value">{formatDate(user.createdAt)}</span>
              </div>
            </div>
            <Button
              label="Logout"
              icon="pi pi-sign-out"
              onClick={handleLogout}
              className="p-button-danger w-100 p-mt-3"
            />
          </Card>
        </div>

        {/* Stats Card */}
        <div className="p-col-12 p-md-6">
          <Card title={statsCardHeader} className="profile-card p-mb-3">
            {loading ? (
              <div className="stats-loading">
                <ProgressSpinner strokeWidth="4" />
              </div>
            ) : error ? (
              <div className="p-error p-p-3 p-mb-3" style={{ borderRadius: '4px' }}>
                {error}
              </div>
            ) : userStats ? (
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-label">Total Paid</div>
                  <div className="stat-value paid">₹{userStats.paid.toLocaleString()}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Total Owes</div>
                  <div className="stat-value owes">₹{userStats.owes.toLocaleString()}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Balance</div>
                  <div className={`stat-value ${userStats.balance >= 0 ? 'positive' : 'negative'}`}>
                    {userStats.balance >= 0 ? '+' : ''}₹{userStats.balance.toLocaleString()}
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Expenses</div>
                  <div className="stat-value expense-count">{expenseCount}</div>
                </div>
              </div>
            ) : (
              <div className="p-text-center p-p-3">No expense data available</div>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}
