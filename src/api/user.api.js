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

export const updateProfile = async (data) => {
    const res = await api.patch("/users/me", data)
    return res.data
}

export const uploadAvatar = async (formData, onProgress) => {
    const res = await api.patch("/users/me/avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
            if (onProgress) {
                onProgress(Math.round((e.loaded * 100) / e.total));
            }
        },
    });
    return res.data;
};

export const deleteUser = async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
};

export const changePassword = async (data) => {
    const res = await api.patch("/users/change-password", data)
    return res.data
}