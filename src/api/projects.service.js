import api from "./axios";

export const getProjects = async () => {
    const res = await api.get("/projects.json")
    return res.data
}