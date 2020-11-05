export type FormEvent = React.FormEvent<HTMLFormElement>;

export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

export type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

export interface IUser {
  id?: string;
  username: string;
  password: string;
}

export interface IProject {
  id?: string;
  userId?: string;
  name: string;
  description: string;
}

export interface IBug {
  id?: string;
  projectId?: string;
  description?: string;
  status?: string;
  comments?: string[];
}

interface IComment {
  bugId?: string;
  comment?: string;
}
