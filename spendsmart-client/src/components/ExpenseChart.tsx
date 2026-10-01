"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { IExpense } from "../types/expense";

// প্রপস ইন্টারফেসটি এখানে স্পষ্টভাবে ডিফাইন করে দিতে হবে
interface ExpenseChartProps {
  expenses: IExpense[];
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function ExpenseChart({ expenses }: ExpenseChartProps) {
  const categoryData = expenses.reduce(
    (acc: { [key: string]: number }, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    },
    {},
  );

  const data = Object.keys(categoryData).map((cat) => ({
    name: cat,
    value: categoryData[cat],
  }));

  if (expenses.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full h-80 flex flex-col items-center justify-center">
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        Expense Distribution
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
