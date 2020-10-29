import { createContext, Dispatch, SetStateAction } from "react";

interface IProject {
  id: string;
  userId: string;
  name: string;
  description: string;
}

interface IProjectsContext {
  projects: IProject[] | [];
  setProjects: Dispatch<SetStateAction<any>> | null;
}

export const ProjectsContext = createContext<IProjectsContext>({ projects: [], setProjects: null });
