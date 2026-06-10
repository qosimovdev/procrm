import api from "./axios";

export const createTask = async ({ data, projectId }) => {
    const res = await api.post(
        `/tasks/projects/${projectId}`, data
    );
    return res.data;
};

export const getProjectTasks = async (projectId) => {
    const res = await api.get(
        `/tasks/projects/${projectId}`
    );
    return res.data;
};

export const getTasks = async () => {
    const res = await api.get("/tasks");
    return res.data;
};

export const getTask = async (id) => {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
};

export const getMyTasks = async () => {
    const res = await api.get("/tasks/my-tasks");
    return res.data;
};

export const updateTask = async ({ id, data, }) => {
    const res = await api.patch(
        `/tasks/${id}`, data
    );
    return res.data;
};

export const updateTaskStatus = async ({ id, status, }) => {
    const res = await api.patch(
        `/tasks/${id}/status`, { status }
    );
    return res.data;
};

export const deleteTask = async (id) => {
    const res = await api.delete(
        `/tasks/${id}`
    );
    return res.data;
};