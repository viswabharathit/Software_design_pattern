import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerTeamMember, registerProjectManager } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    role: 'TEAMMEMBER',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
    if (!formData.contact) formErrors.contact = 'Contact is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      contact:formData.contact,
      role:formData.role
    };
    console.log(userData);
    try {
      if (formData.role === 'TEAMMEMBER') {
        await registerTeamMember(userData);
      } else if (formData.role === 'PROJECTMANAGER') {
        await registerProjectManager(userData);
      }
      navigate('/login');
    }  catch (error) {
     
      console.error('Registration error:', error.response ? error.response : error.message);
      if (error.response) {
          
          console.error('Error data:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
      }
      setErrors({ submit: 'Registration failed. Please try again.' });
  }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md bg-black p-8 rounded-lg border border-gray-800">
        <h1 className="text-white text-2xl font-bold mb-6">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-b-2 border-white bg-transparent text-white w-full py-2 focus:border-green-500 focus:outline-none"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-b-2 border-white bg-transparent text-white w-full py-2 focus:border-green-500 focus:outline-none"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border-b-2 border-white bg-transparent text-white w-full py-2 focus:border-green-500 focus:outline-none"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1">Contact</label>
            <input
              type="number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="border-b-2 border-white bg-transparent text-white w-full py-2 focus:border-green-500 focus:outline-none"
            />
            {errors.contact && <span className="text-red-500 text-sm">{errors.contact}</span>}
          </div>
          {/* <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border-b-2 border-white bg-transparent text-white w-full py-2 focus:border-green-500 focus:outline-none"
            />
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
          </div> */}
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border-b-2 border-white bg-transparent text-white w-full py-2 focus:border-green-500 focus:outline-none"
            >
              <option value="TEAMMEMBER">TEAM MEMBER</option>
              <option value="PROJECTMANAGER">PROJECT MANAGER</option>
            </select>
          </div>
          {/* <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="border-b-2 border-white bg-transparent text-white w-full py-2 focus:border-green-500 focus:outline-none"
            />
            {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth}</span>}
          </div> */}
          {errors.submit && <span className="text-red-500 text-sm">{errors.submit}</span>}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Register
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
