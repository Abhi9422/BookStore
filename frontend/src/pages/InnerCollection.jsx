import React, { useContext, useEffect, useState } from 'react';
import BookDetails from '../components/BookDetails';
import Reviews from '../components/Reviews';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const InnerCollection = () => {
  const{url} = useContext(ShopContext);
  const params = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${url}/api/reviews/list`)
      .then((res) => {
        console.log(res.data[0]);
        // Filter reviews based on book ID from params
      
        const filteredReviews = res.data.filter((review) => review.book._id === params.id);
        setReviews(filteredReviews);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
      });
  }, [params.id]);

  return (
    <div>
      <BookDetails reviews={reviews} />
      <Reviews reviews={reviews} setReviews={setReviews} />
    </div>
  );
};

export default InnerCollection;
