import React, { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ item, onClose }) => {
  const{url} = useContext(ShopContext);
  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description,
    genre: item.genre,
    price: item.price,
    tags: item.tags.join(", "),
    imageUrl: item.imageUrl,
    status: item.status,
    ratings: item.ratings , 
    reviewsCount: item.reviewsCount ,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({ ...prevData, imageFile: file, imageUrl }));
    } else {
      setFormData((prevData) => ({ ...prevData, imageFile: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("genre", formData.genre);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("tags", formData.tags);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("ratings", formData.ratings);
    formDataToSend.append("reviewsCount", formData.reviewsCount);

    if (formData.imageFile) {
      formDataToSend.append("image", formData.imageFile);
    }

    try {
      await axios.put(`${url}/api/books/${item._id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Book updated successfully");
      
      onClose();
    } catch (error) {
      toast.error("Failed to update book");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-hidden">
      <div className="bg-white p-8 rounded-md shadow-md w-full h-full max-w-full max-h-full overflow-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Item</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block mb-2">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </label>
          <label className="block mb-2">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              rows="6"
            />
          </label>
          <label className="block mb-2">
          Genre :  (Comics , Action , Horror , History ,Romance)
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </label>
          <label className="block mb-2">
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </label>
          <label className="block mb-2">
            Tags (comma separated):
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </label>
          <label className="block mb-2">
            Ratings:
            <input
              type="number"
              name="ratings"
              value={formData.ratings}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </label>
          <label className="block mb-2">
            Reviews Count:
            <input
              type="number"
              name="reviewsCount"
              value={formData.reviewsCount}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </label>
          <label className="block mb-2">
            Image Upload:
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3  border rounded-md"
            />
          </label>
          <div className="flex justify-end mt-6 space-x-2">
            <button
              onClick={onClose}
              type="button"
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
