import ExpenseSummary from '../components/ExpenseSummary';
import ExpenseList from '../components/ExpenseList';
import RegisterUserModal from '../components/RegisterUserModal';
import LoginUserModal from '../components/LoginUserModal';
import type { LoggedInUser } from '../services/expenseService';
import '../styles/Layout.css';

interface DashboardProps {
  refreshKey: number;
  onRegistered: () => void;
  onLoggedIn: (user: LoggedInUser) => void;
  registerOpen: boolean;
  loginOpen: boolean;
  onRegisterOpen: (open: boolean) => void;
  onLoginOpen: (open: boolean) => void;
}

export default function Dashboard({
  refreshKey,
  onRegistered,
  onLoggedIn,
  registerOpen,
  loginOpen,
  onRegisterOpen,
  onLoginOpen,
}: DashboardProps) {
  return (
    <>
      <main className="layout-main p-grid p-g-3">
        <div className="p-col-12 p-md-4">
          <ExpenseSummary refreshKey={refreshKey} />
        </div>
        <div className="p-col-12 p-md-8">
          <ExpenseList refreshKey={refreshKey} />
        </div>
      </main>

      <RegisterUserModal
        visible={registerOpen}
        onHide={() => onRegisterOpen(false)}
        onRegistered={onRegistered}
      />

      <LoginUserModal
        visible={loginOpen}
        onHide={() => onLoginOpen(false)}
        onLoggedIn={onLoggedIn}
      />
    </>
  );
}
