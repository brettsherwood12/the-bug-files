import { createContext, Dispatch, SetStateAction } from "react";
import { IBug } from "./types";
import { IUser } from "./types";
import { IProject } from "./types";

interface IUserContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<any>> | null;
}

interface IProjectsContext {
  projects: IProject[] | [];
  setProjects: Dispatch<SetStateAction<any>> | null;
}

interface IBugsContext {
  bugs: IBug[] | [];
  setBugs: Dispatch<SetStateAction<any>> | null;
}

export const UserContext = createContext<IUserContext>({ user: null, setUser: null });

export const ProjectsContext = createContext<IProjectsContext>({ projects: [], setProjects: null });

export const BugsContext = createContext<IBugsContext>({ bugs: [], setBugs: null });
