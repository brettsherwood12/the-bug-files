import axios from "axios";

interface IBody {
  name: string;
  description: string;
  userId: string;
}

const api = axios.create({
  baseURL: `http://localhost:3020/projects`
});

export const addProject = (body: IBody) => api.post("/add", body).then((response) => response.data);

export const loadProjects = (userId: string) => api.get(`/${userId}`).then((response) => response.data);

//export const editProject = (id: string, body: IBody) => api.put(`/${id}`).then((response) => response.data);

export const deleteProject = (id: string) => api.delete(`/${id}`).then((response) => response.data);
