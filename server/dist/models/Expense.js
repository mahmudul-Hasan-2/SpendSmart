import { Schema, model } from "mongoose";
const expenseSchema = new Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: {
        type: String,
        enum: ["Food", "Transport", "Shopping", "Others"],
        required: true,
    },
    date: { type: Date, required: true, default: Date.now },
});
export const Expense = model("Expense", expenseSchema);
