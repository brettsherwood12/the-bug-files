import axios from "axios";

interface IBody {
  username: string;
  password: string;
}

const api = axios.create({
  baseURL: `http://localhost:3020/users`
});

export const signUp = (body: IBody) => api.post("/sign-up", body).then((response) => response.data);

export const signIn = (body: IBody) => api.post("/sign-in", body).then((response) => response.data);

//export const editUser = (id: string, body: IBody) => api.put(`/${id}`).then((response) => response.data);

//export const deleteUser = (id: string) => api.delete(`/${id}`).then((response) => response.data);
