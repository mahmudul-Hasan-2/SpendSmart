import { Router, Request, Response } from "express";
import { Expense } from "../models/Expense";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category && category !== "All") {
      filter = { category };
    }
    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newExpense = new Expense(req.body);
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: "Error creating expense", error });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: "Error updating expense", error });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
});

export default router;

