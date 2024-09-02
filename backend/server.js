import express from "express";
import cors from "cors";
import dotenv from "dotenv";  // Corrected the typo
import connectDB from "./src/config/db.js";
import userRouter from "./src/routes/userRoutes.js";
import cookieParser from 'cookie-parser';
import connectCloudinary from "./src/config/coludinary.js";
import bookRouter from "./src/routes/booksRoute.js";
import reviewRouter from "./src/routes/reviewRoute.js";
dotenv.config();


const app = express();
const port = process.env.PORT;  // Added a fallback port


connectDB();
connectCloudinary();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  }));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", userRouter);
app.use("/api/books" , bookRouter);
app.use("/api/reviews", reviewRouter);

app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));
