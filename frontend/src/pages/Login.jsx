import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'reader',
  });

  const navigate = useNavigate();
  const { url, setLogin , setAuthor } = useContext(ShopContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    const getProtectedData = async () => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error('No token found in localStorage');
      toast.error('You are not authenticated. Please log in.');
      return;
    }
  
    try {
      const response = await axios.get(`${url}/api/users/protected`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('token')), // Include token in request header
        }
      });
  
      setAuthor(response.data.user);
    } catch (error) {
      console.error('Failed to fetch protected data', error);
      toast.error('Failed to fetch protected data. Please try again.');
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/users/login`, formData);
      const token = res.data.token;

      

      // Check if token is received
      if (token) {
        localStorage.setItem('token', JSON.stringify(token)); // Store token in localStorage
        toast.success('Login successful!');

        setLogin(true); // Update context state to indicate user is logged in

        // Navigate to the desired page upon successful login
        if (formData.role === 'reader') {
          navigate('/');
        } else {
          navigate('/admin');
        }

        getProtectedData(); // Fetch protected data after login
   

      } else {
        throw new Error('Token not received');
      }
    } catch (error) {
      console.error('Login failed', error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex box-border justify-center shadow-lg shadow-slate-400 items-center">
      <div className="bg-slate-100 rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-[#002D74]">Login</h2>
          <p className="text-sm mt-4 text-[#002D74]">If you are already a member, easily log in now.</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex gap-5 mt-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="reader"
                  checked={formData.role === 'reader'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Reader
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="author"
                  checked={formData.role === 'author'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Author
              </label>
            </div>

            <button 
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-sm flex justify-between items-center">
            <p>If you don't have an account...</p>
            <button onClick={() => navigate('/register')} className="hover:border text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">
              Register
            </button>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[1600px]"
            src={assets.login_image}
            alt="login form visual"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
