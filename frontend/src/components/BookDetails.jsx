import React, {useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const BookDetails = ({reviews}) => {
  const{url} = useContext(ShopContext);
  const [book, setBook] = useState({});
  const params = useParams();
  useEffect(() => {
    axios.get(`${url}/api/books/list`)
   .then((res) => {
    const bookInfo = res.data.find((book) => book._id === params.id);
    setBook(bookInfo);
   })
   .catch((err) => {
     console.log(err);
   });
  
 },[])
  

  

  

  if (!book.title) {
    // Shimmer Effect Loading State
    return (
      <div className="container mx-auto p-6">
        <div className="border flex flex-col md:flex-row items-center gap-10 justify-between bg-white shadow-lg rounded-lg p-6">
          <div className="w-full md:w-1/2">
            <div className="mb-6">
              <div className="h-8 w-3/4 bg-gray-300 shimmer rounded"></div>
              <div className="h-6 w-1/3 bg-gray-300 shimmer rounded mt-2"></div>
            </div>
            <div className="cover my-4 w-full h-96 bg-gray-300 shimmer rounded-lg shadow-md"></div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="h-6 bg-gray-300 shimmer rounded mb-4"></div>
            <div className="h-6 bg-gray-300 shimmer rounded mb-2"></div>
            <div className="h-6 bg-gray-300 shimmer rounded mb-2"></div>
            <div className="h-6 bg-gray-300 shimmer rounded mb-4"></div>
            <div className="h-6 bg-gray-300 shimmer rounded mb-4"></div>
            <div className="h-6 bg-gray-300 shimmer rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  // Utility function to render stars
  const renderStars = (rating) => {
    const fullStars = rating;
   
    const emptyStars = 5 - rating;

    return (
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.274 3.931a1 1 0 00.95.69h4.084c.969 0 1.372 1.24.588 1.81l-3.305 2.4a1 1 0 00-.363 1.118l1.274 3.931c.3.921-.755 1.688-1.54 1.118l-3.305-2.4a1 1 0 00-1.176 0l-3.305 2.4c-.784.57-1.839-.197-1.54-1.118l1.274-3.931a1 1 0 00-.363-1.118l-3.305-2.4c-.784-.57-.38-1.81.588-1.81h4.084a1 1 0 00.95-.69l1.274-3.931z" />
            </svg>
          ))}
   
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.274 3.931a1 1 0 00.95.69h4.084c.969 0 1.372 1.24.588 1.81l-3.305 2.4a1 1 0 00-.363 1.118l1.274 3.931c.3.921-.755 1.688-1.54 1.118l-3.305-2.4a1 1 0 00-1.176 0l-3.305 2.4c-.784.57-1.839-.197-1.54-1.118l1.274-3.931a1 1 0 00-.363-1.118l-3.305-2.4c-.784-.57-.38-1.81.588-1.81h4.084a1 1 0 00.95-.69l1.274-3.931z" />
            </svg>
          ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="border flex flex-col md:flex-row items-center gap-10 justify-between bg-white shadow-lg rounded-lg p-6">
        <div className="w-full md:w-1/2">
          <div className="mb-6">
            <h1 className="title text-3xl font-bold text-gray-900">{book.title}</h1>
            <p className="author text-xl text-gray-600 mt-2">by {book.author.name}</p>
          </div>
          <img className="cover my-4 w-full h-96 object-cover rounded-lg shadow-md" src={book.cover} alt={book.title} />
        </div>
        <div className="w-full md:w-1/2">
          <p className="description text-gray-700 text-lg mb-4">{book.description}</p>
          <p className="genre font-medium text-gray-800 mb-2">Genre: {book.genre}</p>
          <p className="price font-medium text-gray-800 mb-2">Price: ${book.price}</p>
          <p className="publish-date text-sm text-gray-500 mb-4">
            Published on: {new Date(book.publishDate).toLocaleDateString()}
          </p>
          
          <div className="ratings-reviews flex items-center mb-4">
            <span className="ratings flex items-center mr-2">
              {renderStars(book.ratings)}
            </span>
            <span className="reviews text-gray-600">({reviews.length} reviews)</span>
          </div>
          <div className="tags">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Tags:</h3>
            <ul className="tag-list flex flex-wrap gap-2">
              {book.tags && book.tags.length > 0 ? (
                book.tags.map((tag, index) => (
                  <li key={index} className="tag bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">
                    {tag}
                  </li>
                ))
              ) : (
                <li className="tag bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">No tags</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
