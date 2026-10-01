"use client";

interface ExpenseFilterProps {
  selectedCategory: string;
  onChangeCategory: (category: string) => void;
  totalAmount: number;
}

export default function ExpenseFilter({
  selectedCategory,
  onChangeCategory,
  totalAmount,
}: ExpenseFilterProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Expense History</h2>
        <p className="text-sm text-gray-500">
          Total:{" "}
          <span className="font-bold text-blue-600">
            ${totalAmount.toFixed(2)}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <label className="text-sm font-medium text-gray-700">Filter:</label>
        <select
          value={selectedCategory}
          onChange={(e) => onChangeCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
      </div>
    </div>
  );
}
