import { useQuery } from "@tanstack/react-query";
import { getMe, getUsers } from "../api/user.api";

export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: getMe,
    });
};

export const useGetUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });
};