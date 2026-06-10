import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/api/task.api";

export const useTasks = () => {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });
};