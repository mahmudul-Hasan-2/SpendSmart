"use client";

import { IExpense } from "../types/expense";

interface ExpenseCardProps {
  expense: IExpense;
  onEdit: (expense: IExpense) => void;
  onDelete: (id: string) => void;
}

const categoryColors: { [key: string]: string } = {
  Food: "bg-green-100 text-green-800",
  Transport: "bg-blue-100 text-blue-800",
  Shopping: "bg-yellow-100 text-yellow-800",
  Others: "bg-purple-100 text-purple-800",
};

export default function ExpenseCard({
  expense,
  onEdit,
  onDelete,
}: ExpenseCardProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white border rounded-xl hover:bg-gray-50 transition gap-4 shadow-sm">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-800">{expense.title}</h3>
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${categoryColors[expense.category] || "bg-gray-100 text-gray-800"}`}
          >
            {expense.category}
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Date: {expense.date ? expense.date.split("T")[0] : ""}
        </p>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
        <span className="font-extrabold text-red-600 text-lg">
          -${expense.amount}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(expense)}
            className="text-xs bg-yellow-500 text-white px-3 py-1.5 rounded-lg hover:bg-yellow-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => expense._id && onDelete(expense._id)}
            className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
