import React, { useState } from 'react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [password, setPassword] = useState('password');
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Logic to save the updated profile information
  };

  const handlePasswordChange = () => {
    setShowPasswordPopup(true);
  };

  const handleClosePopup = () => {
    setShowPasswordPopup(false);
  };

  const handlePasswordSubmit = () => {
    // Logic to change the password
    setShowPasswordPopup(false);
  };

  return (
    <div className=" mx-auto p-4 bg-black rounded shadow-md text-white h-full w-full">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className='px-12'>
      <div className="mb-4">
        <label className="block text-gray-400">Name</label>
        {isEditing ? (
            <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-white" 
            />
        ) : (
            <p className="p-2 border-b border-gray-600">{name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-400">Email</label>
        <p className="p-2 bg-transparent border-b border-gray-600">John@gmail.com</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-400">Role</label>
        <p className="p-2 bg-transparent border-b border-gray-600">TEAM MEMBER</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-400">Phone Number</label>
        {isEditing ? (
            <input 
            type="text" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            className="w-full p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-white" 
            />
        ) : (
            <p className="p-2 border-b border-gray-600">{phoneNumber}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-400">Password</label>
        {isEditing ? (
            <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-white" 
            />
        ) : (
            <input 
            type="password" 
            value={password} 
            readOnly
            className="w-full p-2 border-b border-gray-600 bg-transparent" 
            />
        )}
      </div>

      {isEditing ? (
        <button 
        className="bg-green-500 text-white px-4 py-2 rounded" 
        onClick={handleSaveClick}
        >
          Save
        </button>
      ) : (
          <button 
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4" 
          onClick={handleEditClick}
          >
          Edit
        </button>
      )}

      <button 
        className="bg-red-500 text-white px-4 py-2 rounded" 
        onClick={handlePasswordChange}
        >
        Change Password
      </button>
    </div>

      {showPasswordPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 p-4 rounded shadow-md w-96">
            <h3 className="text-lg font-bold mb-4 text-white">Change Password</h3>
            <div className="mb-4">
              <label className="block text-gray-400">Old Password</label>
              <input 
                type="password" 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)} 
                className="w-full p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-white" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400">New Password</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                className="w-full p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-white" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="w-full p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-white" 
              />
            </div>
            <div className="flex justify-end">
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded mr-2" 
                onClick={handleClosePopup}
              >
                Cancel
              </button>
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded" 
                onClick={handlePasswordSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
