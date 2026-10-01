"use client";

import ExpenseList from "@/components/ExpenseList";
import { IExpense } from "@/types/expense";
import { useRouter } from "next/navigation";

export default function ExpensesPage() {
  const router = useRouter();

  const handleEdit = (expense: IExpense) => {
    // Edit korar somoy data-gulo localStorage-e rekhe add-expense page-e pathano jacche
    localStorage.setItem("editingExpense", JSON.stringify(expense));
    router.push("/add-expense");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Expense History
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("editingExpense");
            router.push("/add-expense");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
        >
          + Add New Expense
        </button>
      </div>

      <ExpenseList onEdit={handleEdit} />
    </div>
  );
}
