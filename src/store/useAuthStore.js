// import { create } from "zustand";
// import axiosInstance from "../services/axiosInstance.js";

// export const useAuthStore = create((set, get) => ({
//   user: null,
//   token: localStorage.getItem("token") || null,
//   loading: false,
//   error: null,

//   setUser: (user) => set({ user }),
//   setToken: (token) => {
//     localStorage.setItem("token", token);
//     set({ token });
//   },
//   logout: () => {
//     localStorage.removeItem("token");
//     set({ user: null, token: null });
//     window.location.href = "/login"; // immediate redirect
//   },

//   login: ({ token, user }) => {
//     localStorage.setItem("token", token);
//     set({ token, user });
//   },

//   fetchUser: async () => {
//     const token = get().token;
//     if (!token) return;

//     set({ loading: true });
//     try {
//       const res = await axiosInstance.get("/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const user = res.data;

//       // ✅ Check if ATS center is suspended
//       if (user?.atsCenter?.isSuspended === true) {
//         console.warn("ATS center is suspended. Logging out...");
//         localStorage.removeItem("token");
//         set({ user: null, token: null, loading: false });
//         window.location.href = "/login";
//         return;
//       }

//       set({ user, loading: false });
//     } catch (err) {
//       console.error("Fetch user failed:", err);
//       localStorage.removeItem("token");
//       set({ user: null, token: null, loading: false });
//     }
//   },
// }));
import { create } from "zustand";
import axiosInstance from "../services/axiosInstance.js";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
    window.location.href = "/login";
  },

  login: ({ token, user }) => {
    localStorage.setItem("token", token);
    set({ token, user });
  },

  fetchUser: async () => {
    const token = get().token;
    if (!token) return;

    set({ loading: true });
    try {
      const res = await axiosInstance.get("/auth/me");
      const user = res.data;

      if (user?.atsCenter?.isSuspended === true) {
        localStorage.removeItem("token");
        set({ user: null, token: null, loading: false });
        window.location.href = "/login";
        return;
      }

      set({ user, loading: false });
    } catch (err) {
      console.error("Fetch user failed:", err);
      localStorage.removeItem("token");
      set({ user: null, token: null, loading: false });
    }
  },
}));
