import React, { useState, useContext } from "react";
import "./Project.css";
import Table from "../Table/Table";
import { deleteProject } from "../../services/project";
import { ProjectsContext } from "../../Contexts";
import { IProject } from "../../types";
import { FormEvent } from "../../types";

interface IProps {
  project: IProject;
}

const Project = (props: IProps) => {
  const { project } = props;

  const { projects, setProjects, setActiveIndex } = useContext(ProjectsContext);
  const [deleteMode, setDeleteMode] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await deleteProject(project.id);
    const index = projects.findIndex((item) => item.id === project.id);
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setDeleteMode(false);
    setActiveIndex(0);
    setProjects(newProjects);
  };

  return (
    <div className="project">
      <div className="project-header">
        <div>
          <p>Project: {project.name}</p>
          <p>Description: {project.description}</p>
        </div>
        <div>
          {(!deleteMode && (
            <button className="delete-button" type="submit" onClick={() => setDeleteMode(true)}>
              delete
            </button>
          )) || (
            <>
              <form className="sure-form" onSubmit={handleSubmit}>
                <span>Are you sure?</span>
                <button className="yes-button" type="submit">
                  Yes
                </button>
                <button className="no-button" onClick={() => setDeleteMode(false)}>
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
