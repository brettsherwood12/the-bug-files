import axios from "axios";
import { IBug } from "../types";

interface IComment {
  id?: string;
  comment?: string;
}

interface IStatus {
  id?: string;
  status?: string;
}

const api = axios.create({
  baseURL: `http://localhost:3020/bugs`
});

export const addBug = (body: IBug) => api.post("/add", body).then((response) => response.data);

export const loadBugs = (projectId: string | undefined) =>
  api.get(`/get/${projectId}`).then((response) => response.data);

export const deleteBug = (id: string | undefined) => api.delete(`/delete/${id}`).then((response) => response.data);

export const editStatus = (body: IStatus) => api.put("/status", body).then((response) => response.data);

export const addComment = (body: IComment) => api.put("/comment", body).then((response) => response.data);
