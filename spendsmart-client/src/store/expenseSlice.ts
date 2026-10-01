import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IExpense } from "../types/expense";

// যদি একই ডোমেইনে হয়, তবে রিলাটিভ পাথ ব্যবহার করা সবচেয়ে নিরাপদ
const API_URL = `${process.env.NEXT_PUBLIC_API_URL || ""}/api/expenses`;

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    // নিশ্চিত করুন ডেটা যেন সবসময় অ্যারে হয়
    return Array.isArray(data) ? (data as IExpense[]) : [];
  },
);

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expense: Omit<IExpense, "_id">) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    return (await response.json()) as IExpense;
  },
);

export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async ({ id, expense }: { id: string; expense: Partial<IExpense> }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    return (await response.json()) as IExpense;
  },
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return id;
  },
);

interface ExpenseState {
  items: IExpense[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ExpenseState = {
  items: [],
  status: "idle",
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        if (action.payload && action.payload._id) {
          if (!Array.isArray(state.items)) state.items = [];
          state.items.unshift(action.payload);
        }
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        if (
          Array.isArray(state.items) &&
          action.payload &&
          action.payload._id
        ) {
          const index = state.items.findIndex(
            (item) => item._id === action.payload._id,
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        if (Array.isArray(state.items)) {
          state.items = state.items.filter(
            (item) => item._id !== action.payload,
          );
        }
      });
  },
});

export default expenseSlice.reducer;
