"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses, deleteExpense } from "../store/expenseSlice";
import { RootState } from "../store/store";
import { IExpense } from "../types/expense";
import ExpenseChart from "./ExpenseChart";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseCard from "./ExpenseCard";

interface ExpenseListProps {
  onEdit: (expense: IExpense) => void;
}

export default function ExpenseList({ onEdit }: ExpenseListProps) {
  const dispatch = useDispatch<any>();
  const { items: expenses, status } = useSelector(
    (state: RootState) => state.expenses,
  );
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter((item) => item.category === selectedCategory);

  const totalAmount = filteredExpenses.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );

  if (status === "loading") {
    return (
      <p className="text-center text-gray-500 py-4">Loading expenses...</p>
    );
  }

  return (
    <div className="space-y-6">
      <ExpenseChart expenses={expenses} />

      <ExpenseFilter
        selectedCategory={selectedCategory}
        onChangeCategory={setSelectedCategory}
        totalAmount={totalAmount}
      />

      {filteredExpenses.length === 0 ? (
        <p className="text-gray-500 text-center py-4 bg-white p-6 rounded-xl shadow-md">
          No expenses found.
        </p>
      ) : (
        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              onEdit={onEdit}
              onDelete={(id) => dispatch(deleteExpense(id))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
