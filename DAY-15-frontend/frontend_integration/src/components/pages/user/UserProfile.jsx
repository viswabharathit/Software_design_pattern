import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import {
  FaUser, FaEnvelope, FaLock,
  FaQuestionCircle, FaSignOutAlt,
  FaTrashAlt, FaSave, FaEdit
} from 'react-icons/fa';
import { authService } from '../../services/auth';
import { getCurrentUserId, getUserById, deleteUserById, updateUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getCurrentUserId();
        setUserId(id);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await getUserById(userId);
          const userData = response.data;
          setUsername(userData.username);
          setEmail(userData.email);
          setContact(userData.contact);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  const handleSave = async () => {
    try {
      const updatedData = { username, email, contact, newPassword };
      await updateUser(userId, updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmDelete) {
      try {
        await deleteUserById(userId);
        authService.SignOut();
        navigate('/');
      } catch (error) {
        console.error('Failed to delete user account:', error);
      }
    }
  };

  const handleLogout = () => {
    authService.SignOut();
    navigate('/');
  };

  const handleViewHelp = () => {
    navigate('/help');
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700'>
      <div className="p-8 max-w-3xl w-full bg-gray-900 text-gray-100 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 border-b-2 border-gray-600 pb-4">User Settings</h1>

        <section className="mb-6 flex items-center justify-between">
          <div className="flex flex-row items-center">
            <h2 className="text-xl font-semibold">Profile</h2>
            <FaEdit
              className={`ml-3 text-xl cursor-pointer ${isEditing ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500 transition-colors duration-300`}
              onClick={() => setIsEditing(!isEditing)}
            />
          </div>
          {isEditing && (
            <Button
              onClick={handleSave}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
            >
              <FaSave className="mr-2" />
              Save Changes
            </Button>
          )}
        </section>

        <div className="space-y-5">
          <label className="flex items-center">
            <FaUser className="text-gray-400 mr-3 text-lg" />
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="flex-1 bg-gray-800 text-gray-100 border-gray-600 rounded-lg px-4 py-2"
              disabled={!isEditing}
            />
          </label>
          <label className="flex items-center">
            <FaEnvelope className="text-gray-400 mr-3 text-lg" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-gray-800 text-gray-100 border-gray-600 rounded-lg px-4 py-2"
              disabled={!isEditing}
            />
          </label>
          <label className="flex items-center">
            <FaUser className="text-gray-400 mr-3 text-lg" />
            <Input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter your contact number"
              className="flex-1 bg-gray-800 text-gray-100 border-gray-600 rounded-lg px-4 py-2"
              disabled={!isEditing}
            />
          </label>
          <label className="flex items-center">
            <FaLock className="text-gray-400 mr-3 text-lg" />
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
              className="flex-1 bg-gray-800 text-gray-100 border-gray-600 rounded-lg px-4 py-2"
              disabled={!isEditing}
            />
          </label>
          <label className="flex items-center">
            <FaLock className="text-gray-400 mr-3 text-lg" />
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter a new password"
              className="flex-1 bg-gray-800 text-gray-100 border-gray-600 rounded-lg px-4 py-2"
              disabled={!isEditing}
            />
          </label>
        </div>

        <section className="mt-8">
          <Button
            onClick={handleViewHelp}
            className="bg-blue-600 text-white flex items-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <FaQuestionCircle className="mr-2" />
            View Help
          </Button>
        </section>

        <section className="mt-8 flex justify-between">
          <Button
            onClick={handleDeleteAccount}
            className="text-red-600 bg-transparent hover:text-red-500 flex items-center"
          >
            <FaTrashAlt className="mr-2" />
            Delete Account
          </Button>
          <Button
            onClick={handleLogout}
            className="bg-red-600 text-white flex items-center px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </Button>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
