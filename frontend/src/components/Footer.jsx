import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Footer = () => {
  const{login} = useContext(ShopContext);
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <footer>
      <div className="flex flex-col">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
          <div >
            <p className="mb-5 w-32 font-semibold text-3xl">BookStore...</p>

            <p className="w-full md:w-2/3 text-gray-600">
            Welcome to our bookstore website, where the world of literature comes alive! Explore a diverse collection of books across all genres, from bestsellers to hidden gems. Whether you’re an avid reader or looking for your next great read, our user-friendly platform makes discovering and purchasing books a breeze. Join our community of book lovers and immerse yourself in the joy of reading!
            </p>
          </div>
          {isAuthenticated && <div className="flex flex-col ">
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="w-3/4">
             <Link to ="/home" > <p  className ="cursor-pointer"  >Home</p></Link>
             <Link to={"/about"} > <p  className ="cursor-pointer"  >About us</p></Link>
             <Link to={"/contact"} >  <p  className ="cursor-pointer"  >Contact us</p></Link>
             <Link  to ="/collection" ><p  className ="cursor-pointer"  >Collection</p></Link>
            </ul>
          </div>}
          
          <div >
         <p className="text-xl cursor-pointer font-medium mb-5">GET IN TOUCH</p>
            <div className="flex flex-col gap-1 text-gray-600 ">
              <p>+1-000-000-0000</p>
              <p>abhijeet@dev.com</p>
              <p className="cursor-pointer" >Instagram</p>
            </div>
          </div>
        </div>
        <div>
            <hr />
            <h2 className=" py-7 text-sm text-center">Copyright 2024@ abhijeet.dev - All Right Reserved.</h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
