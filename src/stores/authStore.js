import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem("token") || null,
    isInitializing: true,
    setInitializing: (value) => set({ isInitializing: value }),
    login: (data) => {
        set({
            user: data.user,
            token: data.token,
        });
        localStorage.setItem("token", data.token);
    },
    setUser: (user) => {
        set({ user });
    },
    logout: () => {
        localStorage.removeItem("token");
        set({
            user: null,
            token: null,
        });
    },
}));

export default useAuthStore;