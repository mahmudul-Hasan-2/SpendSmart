import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IExpense } from "../types/expense";

const API_URL = "http://localhost:5000/api/expenses";

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const response = await fetch(API_URL);
    return (await response.json()) as IExpense[];
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
        state.items = action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default expenseSlice.reducer;
