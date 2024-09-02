import React, { useContext, useState } from "react";
import Title from "./Title";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";

const Reviews = ({ reviews, setReviews, productId }) => {
  const { url, author } = useContext(ShopContext);
  const parms = useParams();

  const [review, setReview] = useState({
    rating: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      reader: author.id,
      book: parms.id,

      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${url}/api/reviews`, review);

    setReview({
      rating: "",
      message: "",
    });
  };

  return (
    <section className="bg-white  px-4 py-12 md:py-24">
      <div className="max-w-screen-xl shadow-lg py-20 px-10  mx-auto">
        <h2 className="text-center text-3xl leading-none uppercase max-w-2xl mx-auto mb-12">
          <Title text1={"What Readers"} text2={"Are Saying!"} />
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.length > 0 ? (
            reviews.map((rev, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-lg p-8 text-center"
              >
                <p className="font-bold uppercase">{rev.reader.name}</p>
                <p className="text-xl font-light italic text-gray-700">
                  {rev.message}
                </p>
                <div className="flex items-center justify-center space-x-2 mt-4">
                  {[...Array(Number(rev.rating))].map((_, i) => (
                    <svg
                      key={i}
                      className="text-yellow-500 w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No reviews yet. Be the first to add one!
            </div>
          )}
        </div>
      </div>

      <h2 className="text-3xl text-center my-10">
        <Title text1={"Want to add "} text2={"a review"} />
      </h2>
      <form
        className="md:w-[50%] p-7 my-5 border border-gray-300 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter 1 to 5 stars
          </label>
          <input
            value={review.rating}
            type="number"
            onChange={handleChange}
            id="rating"
            name="rating"
            min="1"
            max="5"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            onChange={handleChange}
            value={review.message}
            rows="4"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Review
        </button>
      </form>
    </section>
  );
};

export default Reviews;
