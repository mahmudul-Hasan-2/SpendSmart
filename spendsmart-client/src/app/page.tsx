"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl rounded-2xl my-8 text-center shadow-lg">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Take Control of Your Finances with SpendSmart
          </h1>
          <p className="text-lg sm:text-xl text-blue-100">
            An easy and smart way to track your daily expenses, monitor
            categories, and achieve your financial goals.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/add-expense"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-50 transition"
            >
              Add Expense
            </Link>
            <Link
              href="/expenses"
              className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              View Expenses
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose SpendSmart?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg font-bold text-xl">
              📊
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Category Tracking
            </h3>
            <p className="text-gray-600">
              Organize your spendings into Food, Transport, Shopping, and more
              to see where your money goes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg font-bold text-xl">
              ⚡
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Real-time Updates
            </h3>
            <p className="text-gray-600">
              Instantly add, update, or remove expenses with a seamless and
              responsive user interface.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg font-bold text-xl">
              🔒
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Secure & Reliable
            </h3>
            <p className="text-gray-600">
              Your financial data is securely stored and managed using modern
              Mongoose and Express backend architecture.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
