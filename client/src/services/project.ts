import axios from "axios";
import { IProject } from "../types";

const api = axios.create({
  baseURL: `http://localhost:3020/projects`
});

export const addProject = (body: IProject) => api.post("/add", body).then((response) => response.data);

export const loadProjects = (userId: string) => api.get(`/${userId}`).then((response) => response.data);

//export const editProject = (id: string, body: IBody) => api.put(`/${id}`).then((response) => response.data);

export const deleteProject = (id: string | undefined) => api.delete(`/${id}`).then((response) => response.data);
