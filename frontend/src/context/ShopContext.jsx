import { createContext, useEffect, useState } from "react";

import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [login, setLogin] = useLocalStorage("login", false);
  const[bookId , setBookId] = useLocalStorage("bookId", "");
  const [data, setData] = useState(null);
  const [author, setAuthor] = useLocalStorage("author", {});
  const url = "http://localhost:4000";
  useEffect(() => {
    axios
      .get(`${url}/api/books/list`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const currency = "$";
  const delevery_fee = 10;
 
  const value = {
    
    currency,
    delevery_fee,
    url,
    setLogin,
    login,
    data,
    author,
    setAuthor,
    bookId,
    setBookId
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
