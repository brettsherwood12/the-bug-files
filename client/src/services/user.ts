import axios from "axios";
import { IUser } from "../types";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/users`
});

export const signUp = (body: IUser) => api.post("/sign-up", body).then((response) => response.data);

export const signIn = (body: IUser) => api.post("/sign-in", body).then((response) => response.data);

//export const editUser = (id: string, body: IBody) => api.put(`/${id}`).then((response) => response.data);

//export const deleteUser = (id: string) => api.delete(`/${id}`).then((response) => response.data);
