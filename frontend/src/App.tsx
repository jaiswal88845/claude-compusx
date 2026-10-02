import Header from './components/Header';
import Footer from './components/Footer';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseList from './components/ExpenseList';
import './styles/Layout.css';
import './App.css';

export default function App() {
  return (
    <div className="layout">
      <Header />

      <main className="layout-main p-grid p-g-3">
        <div className="p-col-12 p-md-4">
          <ExpenseSummary />
        </div>
        <div className="p-col-12 p-md-8">
          <ExpenseList />
        </div>
      </main>

      <Footer />
    </div>
  );
}
