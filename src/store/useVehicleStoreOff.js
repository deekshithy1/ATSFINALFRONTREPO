import { create } from "zustand";
import axiosInstance from "../services/axiosInstance";

export const useVehiclestore = create((set) => ({
  vehicles: [],
  vehiclesByAts: [],

  getVehicles: async () => {
    const response = await axiosInstance.get("/vehicles/getVehicles"); // ✅ fixed
  
    set({ vehicles: response.data });
  },

  getVehiclesById: async (id) => {
    const response = await axiosInstance.get(`/vehicles/getVehicles/${id}`); // ✅ fixed
    set({ vehiclesByAts: response.data });
  },

  setVehicles: () => {
    set({ vehiclesByAts: []});
  },
}));
