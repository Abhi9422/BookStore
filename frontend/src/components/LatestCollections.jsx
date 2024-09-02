import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import CollectionItem from "./CollectionItem";

const LatestCollections = () => {
  const { data } = useContext(ShopContext);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    if (data) {
      const topRated = data.filter((product) => product.ratings >= 4);
      setProductsData(topRated);
    }
  }, [data]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"TOP"} text2={"COLLECTIONS"} />
      </div>
      <p className=" text-center w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Don't miss out on these top-rated books that have captured the hearts
        and minds of readers everywhere.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 gap-y-3">
        {productsData.map((product, index) => (
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

export default LatestCollections;
