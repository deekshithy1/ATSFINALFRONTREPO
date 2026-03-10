

import React, { useState } from 'react';
import axiosInstance from '../services/axiosInstance';

const AddUser = ({ isOpen, onClose ,atsCenterCode}) => {
  const [UserForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',

  });
console.log(atsCenterCode)
  const users=["ADMIN_ATS","ATS_OWNER","MVI"]

  const handleChange = (e) => {
    setUserForm({
      ...UserForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAdmin=async()=>{
    const {email,password,name}=UserForm;
    console.log(email,password,name,atsCenterCode)
    const res=await axiosInstance.post("/users/ats-admin",{email,password,name,atsCenterCode});
  }

  const handleBlockUser=async(email)=>{
   const res= await axiosInstance.post("/users/blockUser",{email});
     
  }
  if (isOpen === 'closed') return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-300 p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          ✖
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New User</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={UserForm.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={UserForm.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={UserForm.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
            />
          </div>

        
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              onClick={handleAddAdmin}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
