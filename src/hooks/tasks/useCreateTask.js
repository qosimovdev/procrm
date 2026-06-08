import { createTask } from "@/api/task.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTask,
        onSuccess: (_, variables) => {
            toast.success("Task created successfully");
            queryClient.invalidateQueries({
                queryKey: ["tasks", variables.projectId],
            });
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to create task"
            );
        },
    });
};