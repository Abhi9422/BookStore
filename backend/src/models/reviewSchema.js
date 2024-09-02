import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  reader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });


export const Review = mongoose.model('Review', reviewSchema);
