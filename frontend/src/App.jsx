import { Route, Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useContext, useEffect, useState } from "react";
import Search from "./components/Search";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Collection from "./pages/Collection";
import { ShopContext } from "./context/ShopContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InnerCollection from "./pages/InnerCollection";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";
import AddBookForm from "./pages/AddBookForm";
import BookManagement from "./pages/BookManagement";
import List from "./pages/List";
import axios from "axios";
import Protected from "./pages/Peotected"
import AuthorReviews from "./pages/AuthorReviews";


export default function App() {
  const { data ,url } = useContext(ShopContext);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios.get(`${url}/api/books/list`)
   .then((res) => {
     setProducts(res.data);
   })
   .catch((err) => {
     console.log(err);
   });
  
 },[])
 
  const [showSearch, setShowSearch] = useState(false);
  const [search , setSearch] = useState("");
  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className=" px-4  sm:px-[5vw] md:px-[7vw] lg:px-[9vW]">
      <NavBar setShowSearch={setShowSearch} showSearch={showSearch} />
      {showSearch && <Search  setShowSearch={setShowSearch} search={search} setSearch={setSearch} />}
      <ToastContainer />
        
        <ScrollToTop/>
        <Routes>
        <Route path="/" element={<Protected><Home/></Protected>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/collection" element={<Collection filteredProducts={filteredProducts} />} />
        <Route path = "/collection/:id"  element = {<InnerCollection/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin"  element={<BookManagement/>}  />
        <Route path="/list" element={<List/>}/>
        <Route path="/reviews" element={<AuthorReviews/>}/>
        
      
      </Routes>
        
      <Footer />
    </div>
  );
}
