import { Book } from "../models/bookSchema.js";
import { User } from "../models/userSchema.js";
import { Review } from "../models/reviewSchema.js";
import { v2 as cloudinary } from "cloudinary";





const addBook = async (req, res) => {
  try {
    const { author, title, description, genre, price, tags, ratings, reviewsCount } = req.body;
    const imageFile = req.file;

    const existingAuthor = await User.findById(author);
    if (!existingAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const newBook = await Book.create({
      author,
      title,
      description,
      genre,
      cover: imageUpload.secure_url,
      publishDate: new Date().toISOString(),
      price,
      tags,
      status: "draft",
      ratings: ratings , 
      reviewsCount: reviewsCount , 
    });

    await newBook.populate('author');
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to add book", error: error.message });
  }
};





const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { title, description, genre, price, tags, status } = req.body;
    const imageFile = req.file; // This assumes you're using multer for file uploads

    // Find the book by ID
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Update the fields
    if (title) book.title = title;
    if (description) book.description = description;
    if (genre) book.genre = genre;
    if (price) book.price = price;
    if (tags) book.tags = tags;
    if (status) book.status = status;

    // Handle image upload if a new image is provided
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image',
      });
      book.cover = imageUpload.secure_url;
    }

    // Save the updated book to the database
    const updatedBook = await book.save();

    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update book', error: error.message });
  }
};







const getAllBooks = async (req, res) => {
  try {
    // Populate the 'author' field with the related User document
    const books = await Book.find().populate('author');

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get books', error: error.message });
  }
};





const deleteBook = async (req, res) => {
  try {
    const {bookId} = req.params;
    const book = await Book.findOneAndDelete({ _id: bookId });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Delete associated reviews manually
    await Review.deleteMany({ book: book._id });

    res.json({ message: 'Book and associated reviews deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete book', error: err.message });
  }
};




export { addBook, getAllBooks , deleteBook , updateBook };