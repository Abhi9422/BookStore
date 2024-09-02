import mongoose from "mongoose";


const bookSchema = new mongoose.Schema(
  {
   
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    cover: { type: String, required: true },
    publishDate: { type: Date, required: true },
    price: { type: Number, required: true },
    tags: [{ type: String }],
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    ratings: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);





export const Book = mongoose.model("Book", bookSchema);
