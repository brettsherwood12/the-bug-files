import axios from "axios";
import { IProject } from "../types";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/projects`
});

export const addProject = (body: IProject) => api.post("/add", body).then((response) => response.data);

export const editProject = (body: IProject) => api.put("/edit", body).then((response) => response.data);

export const loadProjects = (userId: string) => api.get(`/${userId}`).then((response) => response.data);

export const deleteProject = (id: string | undefined) => api.delete(`/${id}`).then((response) => response.data);
