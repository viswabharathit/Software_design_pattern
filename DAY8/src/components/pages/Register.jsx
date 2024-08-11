
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react'; // Importing icons from lucide-react
import RegisterValidation from './RegisterValidation';
import { ToastContainer, toast } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS for Toastify is imported
import '../../assets/css/styles.css'; // Ensure you have your Tailwind CSS file imported

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const handleInput = (e) => {

    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = RegisterValidation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Show success toast notification
      toast.success("Registration successful!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Delay should match the toast notification duration
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-1/3 border-2 rounded-2xl p-10 bg-white">
        <h2 className="text-4xl font-bold mb-8 text-center text-black">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={values.name}
              onChange={handleInput}
              className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none placeholder-gray-500 transition-all rounded-sm"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={values.email}
              onChange={handleInput}
              className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none placeholder-gray-500 transition-all rounded-sm"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={values.password}
              onChange={handleInput}
              className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none placeholder-gray-500 transition-all rounded-sm"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md">
            Sign Up
          </button>
          <p className="text-center text-gray-600 text-sm">By clicking this you agree to our terms and policies</p>
          <Link to="/login" className="w-full block text-center bg-gray-300 text-gray-700 py-2 rounded-md">
            Login
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
