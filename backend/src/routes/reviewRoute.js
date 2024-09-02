import express from "express";
import { createReview, getAllReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/list" , getAllReviews );

export default reviewRouter;