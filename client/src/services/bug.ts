import axios from "axios";

interface IBody {
  projectId: string;
  description: string;
}

const api = axios.create({
  baseURL: `http://localhost:3020/bugs`
});

export const addBug = (body: IBody) => api.post("/add", body).then((response) => response.data);

export const loadBugs = (id: string) => api.get(`/${id}`).then((response) => response.data);

export const editBug = (id: string, body: IBody) => api.put(`/${id}`).then((response) => response.data);

export const deleteBug = (id: string) => api.delete(`/${id}`).then((response) => response.data);
