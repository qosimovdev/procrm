import api from "./axios";

export const createUser = async (data) => {
    const res = await api.post("/users", data);
    return res.data;
};

export const getUsers = async () => {
    const res = await api.get("/users");
    return res.data;
};

export const getMe = async () => {
    const res = await api.get("/users/me");
    return res.data.user;
};

export const deleteUser = async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
};