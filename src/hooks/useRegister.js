import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/auth.api";
import useAuthStore from "@/stores/authStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createAccount,
        onSuccess: (data) => {
            console.log(data);

            login(data);
            toast.success("Account created");
            navigate("/dashboard");
        },
        onError: (err) => {
            console.log(err);

            toast.error(
                err?.response?.data?.message || "Register failed"
            );
        },
    });
};