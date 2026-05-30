import { deleteUser } from "@/api/user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            toast.success("User deleted successfully");
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to delete user");
        },
    });
};