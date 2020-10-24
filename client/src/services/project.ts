import axios from "axios";

interface Body {
  name: string;
  description: string;
}

const api = axios.create({
  baseURL: `http://localhost:3020/projects`
});

export const createProject = (body: Body) => api.post("/create", body).then((response) => response.data);

export const loadProjects = () => api.get("/").then((response) => response.data);
