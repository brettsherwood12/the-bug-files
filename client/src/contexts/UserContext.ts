import { createContext, Dispatch, SetStateAction } from "react";

interface IUser {
  id: string;
  username: string;
}

interface IUserContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<any>> | null;
}

export const UserContext = createContext<IUserContext>({ user: null, setUser: null });
