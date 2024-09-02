import React, { useState } from "react";
import Filter from "../components/Filter";
import Title from "../components/Title";
import CollectionItem from "../components/CollectionItem";
import Pagination from "../components/Pagination ";

const Collection = ({ filteredProducts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState({
    fiveStars: false,
    latest: false,
    action: false,
    comics: false,
    horror: false,
    history: false,
    romance: false,
  });

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  const applyFilters = (products) => {
    let filtered = [...products];

    // Apply filters
    if (filters.fiveStars) {
      filtered = filtered.filter((product) => product.ratings === 5);
    }
    if (filters.latest) {
      filtered = filtered.sort(
        (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
      );
    }
    if (filters.action) {
      filtered = filtered.filter((product) => product.genre === "Action");
    }
    if (filters.comics) {
      filtered = filtered.filter((product) => product.genre === "Comics");
    }
    if (filters.horror) {
      filtered = filtered.filter((product) => product.genre === "Horror");
    }
    if (filters.history) {
      filtered = filtered.filter((product) => product.genre === "History");
    }
    if (filters.romance) {
      filtered = filtered.filter((product) => product.genre === "Romance");
    }

    // Apply sorting
    if (sort === "lowToHigh") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "highToLow") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const filteredAndSortedProducts = applyFilters(filteredProducts);

  const currentProducts = filteredAndSortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  const handleFilterChange = (filterName, isChecked) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: isChecked,
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Filter onFilterChange={handleFilterChange} />

      <div className="flex-1 p-4">
        <div className="flex flex-col sm:flex-row ml-5 justify-start sm:justify-between items-center mb-6">
          <div className="text-3xl">
            <Title text1={"Browse"} text2={"Collections"} />
          </div>
          <div className="flex gap-4">
            <div className="w-fit flex flex-row gap-4">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                id="sortPrice"
                className="w-full shadow-md p-2 border-gray-300 outline-none"
              >
                <option defaultChecked>Click to sort</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="w-full p-2 shadow-md border-none outline-none"
              >
                <option value={10}>Books per page:10</option>
                <option value={30}>Books per page:30</option>
                <option value={50}>Books per page:50</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ml-8">
          {currentProducts.map((product) => (
            <CollectionItem
              key={product._id}
              ratings={product.ratings}
              id={product._id}
              name={product.title}
              image={product.cover}
              price={product.price}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Collection;
