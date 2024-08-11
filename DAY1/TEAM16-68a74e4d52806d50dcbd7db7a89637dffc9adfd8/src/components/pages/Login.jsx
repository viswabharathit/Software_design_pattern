import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react'; // Importing icons from lucide-react
import LoginValidation from './LoginValidation';
import '../../assets/css/styles.css'; // Ensure you have your Tailwind CSS file imported

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(LoginValidation(values));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-1/3 border-2 rounded-2xl p-10 ">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Login Form</h1>
      {/* <Ripple/> */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleInput}
              className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none placeholder-gray-500 placeholder-transparent transition-all"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2  text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInput}
              className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none  placeholder-gray-500 placeholder-transparent transition-alltransition-all"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md">
            Log In
          </button>
          <p className="text-center text-gray-600 text-sm">By clicking this you agree to our terms and policies</p>
          <Link to="/Register" className="w-full block text-center bg-gray-300 text-gray-700 py-2 rounded-md">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
