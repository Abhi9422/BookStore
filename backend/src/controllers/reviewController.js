import { Review } from '../models/reviewSchema.js';
import { Book } from '../models/bookSchema.js';
import { User } from '../models/userSchema.js';



const createReview = async (req, res) => {
  const { book, reader, message, rating } = req.body;

  try {
    // Validate that the book and reader exist
    const existingBook = await Book.findById(book);
    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const existingReader = await User.findById(reader);
    if (!existingReader) {
      return res.status(404).json({ message: 'Reader not found' });
    }

    // Create the new review
    const newReview = await Review.create({
      book,
      reader,
      message,
      rating,
    });
 
    // Populate the book and reader fields
    await newReview.populate('book')
    await newReview.populate('reader')

    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review', error: error.message });
  }
};

  
const getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.find({})
        .populate('book')
        .populate('reader');
        
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


export { createReview  , getAllReviews };
