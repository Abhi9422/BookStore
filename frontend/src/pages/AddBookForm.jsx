import React, { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBookForm = () => {
  const { url, author } = useContext(ShopContext); // Use context for URL and author

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    price: "",
    tags: "",
    image: null, // File input for the image
    ratings: "", // Field for ratings
    reviewsCount: "", // Field for reviews count
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value, // For file input, use the first file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("author", author.id);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("genre", formData.genre);
      data.append("price", formData.price);
      data.append("tags", formData.tags);
      data.append("ratings", formData.ratings); // Append ratings
      data.append("reviewsCount", formData.reviewsCount); // Append reviews count
      if (formData.image) data.append("image", formData.image); // Append the file if it exists

      const response = await axios.post(`${url}/api/books/add`, data);
      toast.success("Book added successfully!");

      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        genre: "",
        price: "",
        tags: "",
        image: null,
        ratings: "",
        reviewsCount: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again." ,error.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      {/* Title Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      {/* Genre Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Genre (Comics , Action , Horror , History ,Romance)</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      {/* Price Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      {/* Tags Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      {/* Ratings Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Ratings</label>
        <input
          type="number"
          name="ratings"
          value={formData.ratings}
          onChange={handleChange}
          required
          min="0"
          max="5"
          step="0.1"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
        <p className="text-sm text-gray-500">Rate the book between 0 and 5</p>
      </div>

      {/* Reviews Count Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Reviews Count</label>
        <input
          type="number"
          name="reviewsCount"
          value={formData.reviewsCount}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      {/* Image Upload Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Image Upload</label>
        <div className="mt-1 flex items-center justify-between border border-gray-300 p-2 rounded-md bg-white">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full cursor-pointer bg-gray-50 text-gray-700"
          />
          <span className="text-sm text-gray-500">
            {formData.image ? formData.image.name : "Choose file"}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
