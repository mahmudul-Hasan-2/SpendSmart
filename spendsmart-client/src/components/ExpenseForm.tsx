"use client";

import { useState, useEffect, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addExpense, updateExpense } from "../store/expenseSlice";
import { IExpense } from "../types/expense";

interface ExpenseFormProps {
  editingExpense: IExpense | null;
  clearEditing: () => void;
}

export default function ExpenseForm({
  editingExpense,
  clearEditing,
}: ExpenseFormProps) {
  const dispatch = useDispatch<any>();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<
    "Food" | "Transport" | "Shopping" | "Others"
  >("Food");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(editingExpense.date.split("T")[0]);
    } else {
      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate("");
    }
  }, [editingExpense]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !date) return;

    const expenseData = {
      title,
      amount: parseFloat(amount),
      category,
      date,
    };

    if (editingExpense && editingExpense._id) {
      dispatch(updateExpense({ id: editingExpense._id, expense: expenseData }));
      clearEditing();
    } else {
      dispatch(addExpense(expenseData));
    }

    setTitle("");
    setAmount("");
    setDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">
        {editingExpense ? "Edit Expense" : "Add New Expense"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Grocery Shopping"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount ($)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., 50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={category}
          onChange={(e: any) => setCategory(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
        {editingExpense && (
          <button
            type="button"
            onClick={clearEditing}
            className="w-full bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
