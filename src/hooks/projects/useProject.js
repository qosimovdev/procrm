import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/projects.api";

export const useProject = (id) => {
    return useQuery({
        queryKey: ["project", id],
        queryFn: () => getProjectById(id),
        enabled: !!id,
    });
};