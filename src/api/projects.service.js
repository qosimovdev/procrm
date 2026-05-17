import api from "./axios";

export const getProjects = async () => {
    const res = await api.get("/projects.json")
    return res.data
}

export const getProjectById = async (id) => {
    const res = await api.get("/projects.json");
    const projects = Object.values(res.data || {});
    return projects.find((p) => String(p.id) === String(id));
};

export const createProject = async (data) => {
    const res = await api.post("/projects.json", data);
    return res.data;
};