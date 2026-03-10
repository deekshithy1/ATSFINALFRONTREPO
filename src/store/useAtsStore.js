import {create} from 'zustand';

import axiosInstance from '../services/axiosInstance';
export const useAtsStore=create((set)=>({
    ats:[],

    atsvehiclesfn:async()=>{
          const response=await axiosInstance.get("/centers/allatsIds");
          set({ats:response.data});
    },
    addATS:async(atsData)=>{
        const response =await axiosInstance.post("/centers/createnew",atsData)
    },
    // blockUser:async(email)=>{
    //     const response=await axiosInstance.post("/users/unblockUser",email);
    // },
    // unblockUser:async(email)=>{
    //     const response=await axiosInstance.post("/users/unblockUser",email);
    // },
}))

