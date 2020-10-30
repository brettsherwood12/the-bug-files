import React, { useState, useContext } from "react";
import "./Project.css";
import Table from "../Table/Table";
import { deleteProject } from "../../services/project";
import { ProjectsContext } from "../../Contexts";
import { IProject } from "../../types";
import { FormEvent } from "../../types";
import { ButtonEvent } from "../../types";

interface IProps {
  project: IProject;
}

const Project = (props: IProps) => {
  const { project } = props;

  const { projects, setProjects } = useContext(ProjectsContext);

  const [allowDelete, setAllowDelete] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data = await deleteProject(project.id);
    if (data.deleted) {
      const index = projects.findIndex((item) => item.id === project.id);
      const newProjects = [...projects].splice(index, 1);
      if (setProjects) setProjects(newProjects);
    }
  };

  const handleDeleteClick = (event: ButtonEvent) => {
    event.preventDefault();
    setAllowDelete(true);
  };

  const handleNoClick = (event: ButtonEvent) => {
    event.preventDefault();
    setAllowDelete(false);
  };

  return (
    <div className="project">
      <div className="project-header">
        <div>
          <p>Project: {project.name}</p>
          <p>Description: {project.description}</p>
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
      <Table projectId={project.id} />
    </div>
  );
};

export default Project;
