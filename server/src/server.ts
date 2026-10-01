import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "";

// ক্যাশড ডাটাবেসের সঠিক টাইপ ডিফাইন করা (typeof mongoose অথবা mogoose.Mongoose)
let cachedDb: typeof mongoose | null = null;

async function connectDB() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  const opts = {
    bufferCommands: false,
  };
  cachedDb = await mongoose.connect(MONGO_URI, opts);
  console.log("MongoDB connected successfully");
  return cachedDb;
}

// মিডলওয়্যার হিসেবে ডাটাবেস কানেকশন নিশ্চিত করা
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection middleware error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use("/api/expenses", expenseRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("SpendSmart API is running...");
});

export default app;

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
