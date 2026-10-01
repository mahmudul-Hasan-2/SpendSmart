import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const MONGO_URI = process.env.MONGO_URI || "";
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));
app.use("/api/expenses", expenseRoutes);
app.get("/", (req, res) => {
    res.send("SpendSmart API is running...");
});
// Vercel-এর জন্য export করো
export default app;
// Local development-এর জন্য শুধু listen করো
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
