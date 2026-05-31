import { updateProfile } from "@/api/user.api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateProfile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            toast.success("Profile info updated!");
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message ?? "Something went wrong")
        }
    })
}