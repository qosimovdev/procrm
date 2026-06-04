import { createProject } from "../../api/projects.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            toast.success("Project created successfully");
            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to create project"
            );
        },
    });
};