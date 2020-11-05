import React, { useState, useContext } from "react";
import "./Project.css";
import { UserContext } from "../../Contexts";
import { ProjectsContext } from "../../Contexts";
import { addProject } from "../../services/project";
import { FormEvent } from "../../types";

const AddProject = () => {
  const { user } = useContext(UserContext);
  const { projects, setProjects, setActiveIndex } = useContext(ProjectsContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      //used any to shut ts up, this view won't be rendered if user is null
      const project = await addProject({ name, description, userId: (user as any).id });
      const newProjects = [...projects, project];
      setDescription("");
      setName("");
      setProjects(newProjects);
      setActiveIndex(newProjects.length - 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="project">
      <p>Add Project</p>
      <form className="add-project-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name-input">Name:</label>
          <input id="name-input" type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="description-group">
          <label htmlFor="description-input">Description:</label>
          <textarea
            id="description-input"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProject;
