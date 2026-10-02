import React, { useEffect, useState } from 'react';
import type { UserSummary } from '../services/expenseService';
import { fetchSummary } from '../services/expenseService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';

export default function ExpenseSummary() {
  const [summary, setSummary] = useState<UserSummary[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSummary()
      .then((res) => {
        setTotal(res.totalExpenses);
        setSummary(res.summary);
      })
      .catch((err) => setError(String(err)));
  }, []);

  if (error) return <div className="p-error">Error: {error}</div>;

  return (
    <Card className="p-mb-3" title="Expense Summary">
      <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
        <div>Total Expenses</div>
        <div className="p-text-bold">₹{total.toLocaleString()}</div>
      </div>

      <DataTable value={summary} responsiveLayout="scroll">
        <Column field="user" header="User" />
        <Column
          field="paid"
          header="Paid"
          body={(row: UserSummary) => `₹${row.paid.toLocaleString()}`}
        />
        <Column
          field="owes"
          header="Owes"
          body={(row: UserSummary) => `₹${row.owes.toLocaleString()}`}
        />
        <Column
          field="balance"
          header="Balance"
          body={(row: UserSummary) =>
            `${row.balance >= 0 ? '+' : ''}₹${row.balance.toLocaleString()}`
          }
        />
      </DataTable>
    </Card>
  );
}
