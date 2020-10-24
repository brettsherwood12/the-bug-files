import React, { useState, useEffect } from "react";
import { loadProjects } from "../../services/project";

interface IProject {
  name: string;
  description: string;
}

const Main = () => {
  const [loaded, setLoaded] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    loadProjects()
      .then((data) => {
        setLoaded(true);
        setProjects(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {loaded && (
        <ul>
          {projects.map((project) => (
            <li>
              <p>{project.name}</p>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Main;
