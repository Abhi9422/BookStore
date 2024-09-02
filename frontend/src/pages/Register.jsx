import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {

  const{url} = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'reader', // Default role set to 'reader'
  });

  const navigate = useNavigate();
  const notify = (text) => {
    toast.success(text);
  };
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
       const response = await axios.post(`${url}/api/users/register`, formData)
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'reader',
      })
      notify(response.data.message);
      navigate('/login');
    } catch (error) {
      notify(error.response.data.message);
    }
   
    
  };

  return (
    <section className="bg-gray-100 min-h-screen flex box-border justify-center shadow-lg shadow-slate-400 items-center">
      <div className="bg-slate-100 rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-[#002D74]">Register</h2>
          <p className="text-sm mt-4 text-[#002D74]">Create your account now.</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              className="p-2 mt-8 rounded-xl border"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="p-2 mt-4 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="p-2 mt-4 rounded-xl border w-full"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="mt-4 flex gap-4">
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
              Register
            </button>
          </form>
          <div className="mt-4 text-sm flex justify-between items-center">
            <p>If you already have an account...</p>
            <button onClick={() => navigate('/login')} className="hover:border text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">
              Login
            </button>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[1600px]"
            src={assets.login_image}
            alt="registration form visual"
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
