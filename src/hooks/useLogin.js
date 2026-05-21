import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/auth.api";
import useAuthStore from "@/stores/authStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login);

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // zustand save
            login(data);
            toast.success("Login successful");
            // redirect
            navigate("/dashboard")
        },
        onError: (err) => {
            console.log(err);
            toast.error(
                err.response?.data?.message || "Login failed"
            );
        },
    });
};