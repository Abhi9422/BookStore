import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import CollectionItem from "./CollectionItem";

const BestSellers = () => {
  const { data } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    if (data) {
      const products = data.filter((product) => product.reviewsCount > 50);
      setBestSellers(products);
    }
  }, []);

  return (
    <div>
      <div className="text-center py-8 text-3xl">
        <Title text1={"BEST"} text2={"SELLERS"} />
      </div>
      <p className=" text-center w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Explore the books that everyone’s talking about—our top sellers are
        flying off the shelves!
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 gap-y-3">
        {bestSellers.map((product, index) => (
          <CollectionItem
            key={product._id}
            name={product.title}
            image={product.cover}
            price={product.price}
            id={product._id}
            ratings={product.ratings}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
