import React, { useState, useContext } from "react";
import "./Project.css";
import Table from "../Table/Table";
import { deleteProject } from "../../services/project";
import { ProjectsContext } from "../../contexts/ProjectsContext";

type Event = React.FormEvent<HTMLFormElement>;

interface IProps {
  project: {
    id: string;
    name: string;
    description: string;
  };
}

const Project = (props: IProps) => {
  const { projects, setProjects } = useContext(ProjectsContext);

  const [allowDelete, setAllowDelete] = useState(false);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const data = await deleteProject(props.project.id);
    const index = projects.findIndex((project) => project.id === data.deletedId);
    const newProjects = [...projects].splice(index, 1);
    if (setProjects) setProjects(newProjects);
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAllowDelete(true);
  };

  const handleNoClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAllowDelete(false);
  };

  return (
    <div className="project">
      <div className="project-header">
        <div>
          <p>Project: {props.project.name}</p>
          <p>Description: {props.project.description}</p>
        </div>
        <div>
          {(!allowDelete && (
            <button className="delete-button" type="submit" onClick={handleDeleteClick}>
              delete
            </button>
          )) || (
            <>
              <form className="sure-form" onSubmit={handleSubmit}>
                <span>Are you sure?</span>
                <button className="yes-button" type="submit">
                  Yes
                </button>
                <button className="no-button" onClick={handleNoClick}>
                  No
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <hr />
      <Table projectId={props.project.id} />
    </div>
  );
};

export default Project;
