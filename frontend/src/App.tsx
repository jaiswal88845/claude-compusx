import React from 'react';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseList from './components/ExpenseList';
import './App.css';

export default function App() {
  return (
    <div className="app p-p-4">
      <header className="p-mb-4">
        <h1 className="p-m-0">CLAUDE CAMPUSX</h1>
        <p className="p-text-secondary">Split Expenses</p>
      </header>

      <main className="p-grid p-g-3">
        <div className="p-col-12 p-md-4">
          <ExpenseSummary />
        </div>
        <div className="p-col-12 p-md-8">
          <ExpenseList />
        </div>
      </main>
    </div>
  );
}
