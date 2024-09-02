import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';


const Peotected = ({children}) => {
  
    
    const isAuthenticated = !!localStorage.getItem('token');
    

    return isAuthenticated  ? children : <Navigate to="/login" replace />;
  
}

export default Peotected