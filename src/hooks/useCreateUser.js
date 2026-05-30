import { createUser } from "@/api/user.api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            toast.success("User created successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.message ??
                "Something went wrong"
            );
        },
    });
};