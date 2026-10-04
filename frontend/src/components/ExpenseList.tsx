import React, { useEffect, useState } from 'react';
import type { Expense } from '../services/expenseService';
import { fetchExpenses, fetchExpenseById } from '../services/expenseService';
import ExpenseDetails from './ExpenseDetails';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';

interface ExpenseListProps {
  refreshKey?: number;
}

export default function ExpenseList({ refreshKey = 0 }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selected, setSelected] = useState<Expense | null>(null);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    fetchExpenses()
      .then(setExpenses)
      .catch((err) => setError(String(err)));
  }, [refreshKey]);

  const openExpense = async (id: number) => {
    try {
      const e = await fetchExpenseById(id);
      setSelected(e);
      setVisible(true);
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <Card title="All Expenses">
      {error && <div className="p-error">{error}</div>}

      <DataTable value={expenses} responsiveLayout="scroll">
        <Column field="date" header="Date" />
        <Column field="description" header="Description" />
        <Column field="category" header="Category" />
        <Column
          field="amount"
          header="Amount"
          body={(row: Expense) => `₹${row.amount.toLocaleString()}`}
        />
        <Column field="paidBy" header="Paid By" />
        <Column
          header=""
          body={(row: Expense) => (
            <Button label="View" onClick={() => openExpense(row.id)} icon="pi pi-eye" />
          )}
        />
      </DataTable>

      <Dialog header={selected?.description} visible={visible} onHide={() => setVisible(false)} style={{ width: '40vw' }}>
        <ExpenseDetails expense={selected} />
      </Dialog>
    </Card>
  );
}
