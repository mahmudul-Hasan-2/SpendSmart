"use client";

import { useEffect, useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import { IExpense } from "@/types/expense";
import { useRouter } from "next/navigation";

export default function AddExpensePage() {
  const router = useRouter();
  const [editingExpense, setEditingExpense] = useState<IExpense | null>(null);

  useEffect(() => {
    // সেফটি চেক: ব্রাউজারে লোকালস্টোরেজ থেকে এডিট ডাটা লোড করা
    const saved = localStorage.getItem("editingExpense");
    if (saved) {
      try {
        setEditingExpense(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse editing expense", error);
      }
    }
  }, []);

  const handleClear = () => {
    localStorage.removeItem("editingExpense");
    router.push("/expenses");
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 space-y-6">
      <div>
        <button
          onClick={handleClear}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          &larr; Back to Expense List
        </button>
      </div>

      <ExpenseForm editingExpense={editingExpense} clearEditing={handleClear} />
    </div>
  );
}
