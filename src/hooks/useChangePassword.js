import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/api/user.api";
import { toast } from "sonner";

export const useChangePassword = () => {
    return useMutation({
        mutationFn: changePassword,
        onSuccess: (res) => {
            toast.success(
                res.message || "Password changed successfully"
            );
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Failed to change password"
            );
        },
    });
};