import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Pagination from "../components/Pagination ";
import { useNavigate } from "react-router-dom";

const AuthorReviews = () => {
  const navigate = useNavigate();
  const { url, bookId, author } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get(`${url}/api/reviews/list`)
      .then((res) => {
        const filteredReviews = res.data.filter(
          (review) =>
            review.book._id === bookId && review.book.author === author.id
        );

        // Sort reviews by date in descending order
        filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));

        setReviews(filteredReviews);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
      });
  }, [url, bookId, author.id]);

  // Pagination logic
  const indexOfLastReview = currentPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded"
        >
          <option value={10}>10 items per page</option>
          <option value={30}>30 items per page</option>
          <option value={50}>50 items per page</option>
        </select>
      </div>

      <div className="flex flex-col gap-10 justify-center items-center px-4 md:px-8 lg:px-16 py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-4">
          Your Product Reviews
        </h1>
        {reviews.length > 0 ? (
          currentReviews.map((review) => (
            <figure
              key={review._id}
              className="max-w-full sm:w-2/5 md:max-w-screen-md shadow-md text-black py-6 px-8 md:px-12 md:w-2/3 lg:px-16 lg:w-9/12 hover:scale-105 ease-in-out duration-500"
            >
              <div className="flex items-center mb-4 text-yellow-300">
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
              <blockquote>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                  {review.message}
                </p>
              </blockquote>
              <figcaption className="flex items-center mt-6 space-x-3">
                <div className="flex items-center divide-x-2 divide-gray-700">
                  <cite className="pr-3 font-medium text-gray-900">
                    {review.reader.name}
                  </cite>
                  <p className="pl-3 text-sm text-gray-600">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))
        ) : (
          <p>No reviews yet</p>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default AuthorReviews;
