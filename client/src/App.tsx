import * as React from "react";
import { useState, useEffect } from "react";
import CSS from "csstype";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Project from "./components/Project/Project";
import AddProject from "./components/Project/AddProject";
import Default from "./components/Project/Default";
import { UserContext } from "./contexts/UserContext";
import { ProjectsContext } from "./contexts/ProjectsContext";
import { loadProjects } from "./services/project";

interface IProject {
  id: string;
  name: string;
  userId: string;
  description: string;
}

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [addProject, setAddProject] = useState(false);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    //used any to shut ts up, find better fix
    if (user) {
      loadProjects((user as any).id)
        .then((data) => {
          setProjects(data);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  useEffect(() => {
    if (projects[projects.length - 1]) {
      setActiveIndex(projects.length - 1);
    }
  }, [projects.length]);

  const handleChange = (id: string) => {
    const index = projects.findIndex((project) => project.id === id);
    setAddProject(false);
    setActiveIndex(index);
  };

  const toggleAdd = () => {
    setAddProject(true);
  };

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <ProjectsContext.Provider value={{ projects, setProjects }}>
          <Navbar />
          <main>
            <div className="projects-tabs">
              {(projects.length &&
                projects.map((project, index) => {
                  const spanStyles: CSS.Properties =
                    index === activeIndex ? { position: "relative", left: "1px" } : { position: "static", right: "0" };
                  return (
                    <span
                      key={project.id}
                      style={spanStyles}
                      className="project-tab"
                      role="button"
                      onClick={() => handleChange(project.id)}
                    >
                      <h5 className="tab-heading">{project.name}</h5>
                    </span>
                  );
                })) || (
                <span style={{ position: "relative", left: "1px" }} className="project-tab">
                  <h5 className="tab-heading">&emsp;&emsp;&emsp;&emsp;</h5>
                </span>
              )}
              {user && (
                <span className="add-project" role="button" onClick={toggleAdd}>
                  +
                </span>
              )}
            </div>
            <div className="project-active">
              {user && !addProject && projects.length > 0 && <Project project={projects[activeIndex]} />}
              {user && !addProject && !projects.length && <Default user={true} />}
              {user && addProject && <AddProject />}
              {!user && <Default user={false} />}
            </div>
          </main>
          <div>
            <p className="signature">Created by Brett Sherwood</p>
          </div>
        </ProjectsContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default App;
