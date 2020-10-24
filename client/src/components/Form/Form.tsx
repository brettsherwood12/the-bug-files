import React, { useState, SyntheticEvent } from "react";
import { createProject } from "../../services/project";

const Form = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: SyntheticEvent) => {
    console.log(event);
    event.preventDefault();
    try {
      const project = await createProject({ name, description });
      console.log(project);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="project-input">Add a project:</label>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        <label htmlFor="project-input">project description:</label>
        <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
