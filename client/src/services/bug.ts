import axios from "axios";
import { IBug, IComment } from "../types";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/bugs`
});

export const addBug = (body: IBug) => api.post("/add", body).then((response) => response.data);

export const loadBugs = (projectId: string | undefined) =>
  api.get(`/get/${projectId}`).then((response) => response.data);

export const deleteBug = (id: string | undefined) => api.delete(`/delete/${id}`).then((response) => response.data);

export const editStatus = (body: IBug) => api.put("/status/edit", body).then((response) => response.data);

export const editDescription = (body: IBug) => api.put("/description/edit", body).then((response) => response.data);

export const addComment = (body: IComment) => api.put("/comment/add", body).then((response) => response.data);

export const deleteComment = (body: IComment) => api.put("/comment/delete", body).then((response) => response.data);
