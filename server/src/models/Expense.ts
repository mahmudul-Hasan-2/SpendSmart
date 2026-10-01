import { Schema, model, Document } from "mongoose";

export interface IExpense extends Document {
  title: string;
  amount: number;
  category: "Food" | "Transport" | "Shopping" | "Others";
  date: Date;
}

const expenseSchema = new Schema<IExpense>({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    enum: ["Food", "Transport", "Shopping", "Others"],
    required: true,
  },
  date: { type: Date, required: true, default: Date.now },
});

export const Expense = model<IExpense>("Expense", expenseSchema);
