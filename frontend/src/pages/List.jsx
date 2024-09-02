import React, { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "../components/Modal";
import Pagination from "../components/Pagination ";
import SideBar from "../components/SideBar";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const { author, setBookId ,url } = useContext(ShopContext);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  useEffect(() => {
    axios.get(`${url}/api/books/list`)
      .then((res) => {
        const filterData = res.data.filter((item) => item.author._id === author.id);
        setItems(filterData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [author.id]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination logic
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    await axios.delete(`${url}/api/books/${id}`);
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    toast.success("Book deleted successfully");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleReviews = (id) => {
    setBookId(id);
    navigate("/reviews");
  };

  const handleSaveChanges = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    handleCloseModal();
  };

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col md:flex-row">
      <SideBar className="md:w-1/4 w-full" />
      <div className="flex-1 p-4">
        <div className="flex flex-col mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border outline-none rounded-md"
          />
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value={10}>10 items per page</option>
            <option value={30}>30 items per page</option>
            <option value={50}>50 items per page</option>
          </select>
        </div>
        <ul className="bg-white shadow overflow-hidden sm:rounded-md">
          {currentItems.map((item, index) => (
            <li
              key={item._id}
              className={index !== 0 ? "border-t border-gray-200" : ""}
            >
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-gray-500">
                    Author: {item.author.name}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    Genre: {item.genre}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    Tags: {item.tags.join(", ")}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    Status:{" "}
                    <span className={`text-${item.statusColor}`}>
                      {item.status}
                    </span>
                  </p>
                  <div className="flex flex-col items-start">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="font-medium text-red-600 hover:text-red-500"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleReviews(item._id)}
                      className="font-medium text-green-600 hover:text-green-500"
                    >
                      Reviews
                    </button>
                  </div>
                </div>
                <img
                  src={item.cover}
                  alt={item.title}
                  className="mt-2 w-24 h-24 object-cover"
                />
              </div>
            </li>
          ))}
        </ul>
        {isModalOpen && (
          <Modal
            item={selectedItem}
            onClose={handleCloseModal}
            onSave={handleSaveChanges}
          />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredItems.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default List;
