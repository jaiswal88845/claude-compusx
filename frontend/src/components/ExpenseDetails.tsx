import React from 'react';
import type { Expense } from '../services/expenseService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';

export default function ExpenseDetails({ expense }: { expense: Expense | null }) {
  if (!expense) return <div>No expense selected.</div>;

  return (
    <Card>
      <div className="p-grid p-align-center p-justify-between p-mb-2">
        <div>Date: {expense.date}</div>
        <div>Paid by: {expense.paidBy}</div>
      </div>

      <DataTable value={expense.participants} size="small">
        <Column field="user" header="User" />
        <Column field="amount" header="Amount" body={(p: any) => `₹${p.amount.toLocaleString()}`} />
      </DataTable>
    </Card>
  );
}
