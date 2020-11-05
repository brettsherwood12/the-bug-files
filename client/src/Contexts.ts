import { createContext, Dispatch, SetStateAction } from "react";
import { IUser, IProject, IBug } from "./types";

interface IUserContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<any>>;
}

interface IProjectsContext {
  projects: IProject[] | [];
  setProjects: Dispatch<SetStateAction<any>>;
  setActiveIndex: Dispatch<SetStateAction<any>>;
}

interface IBugsContext {
  bugs: IBug[] | [];
  setBugs: Dispatch<SetStateAction<any>>;
}

export const UserContext = createContext<IUserContext>({ user: null, setUser: () => null });

export const ProjectsContext = createContext<IProjectsContext>({
  projects: [],
  setProjects: () => null,
  setActiveIndex: () => null
});

export const BugsContext = createContext<IBugsContext>({ bugs: [], setBugs: () => null });
