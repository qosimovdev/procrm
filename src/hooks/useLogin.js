import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/auth.api";
import useAuthStore from "@/stores/authStore";
import { toast } from "sonner";

export const useLogin = () => {
    const login = useAuthStore((state) => state.login);

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // zustand save
            login(data);
            // localStorage save
            localStorage.setItem("token", data.token);
            toast.success("Login successful");
            // redirect
            window.location.href = "/dashboard";
        },
        onError: (err) => {
            console.log(err);
            toast.error(
                err.response?.data?.message || "Login failed"
            );
        },
    });
};