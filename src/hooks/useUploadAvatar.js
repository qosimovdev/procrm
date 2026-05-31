import { uploadAvatar } from "@/api/user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUploadAvatar = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ formData, onProgress }) =>
            uploadAvatar(formData, onProgress),
        onSuccess: () => {
            // toast.success("Avatar updated!");
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message ?? "Upload failed");
        },
    });
};