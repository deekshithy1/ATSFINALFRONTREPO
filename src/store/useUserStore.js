// store/useUserStore.js
import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';

export const useUserStore = create((set) => ({
  users: [],
  getAllUsers: async (id) => {
    try {
      const response = await axiosInstance.get(`/users/techniciansByAts/${id}`);
      set({ users: response.data });
    } catch (error) {
      console.error("Failed to fetch users:", error.response?.data || error.message);
    }
  },
  setUsersNull: () => set({ users: [] }),
  blockUser:async(email)=>{
    try{
      const response=await axiosInstance.post("/users/blockUser",{email});
    
    }
    catch(err)
    {
      console.log(err);
    }
  },
  unblockUser:async(email)=>{
    try{
      const response=await axiosInstance.post("/users/unblockUser",{email});
    
    }
    catch(err)
    {
      console.log(err);
    }
  },
 addAdmin:async(formData)=>{
  try{
    const response=await axiosInstance.post("/users/ats-admin",formData)
  }
  catch(err)
  {
    console.log(err);
  }
 },


}));
