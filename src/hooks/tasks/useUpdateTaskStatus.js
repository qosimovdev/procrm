import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatus } from "@/api/task.api";
import { toast } from "sonner";

export const useUpdateTaskStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTaskStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });
            toast.success("Task status updated!");
        },
    });
};