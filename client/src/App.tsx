import React, { useState, useEffect } from "react";
import CSS from "csstype";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Project from "./components/Project/Project";
import AddProject from "./components/Project/AddProject";
import Default from "./components/Project/Default";
import { UserContext } from "./Contexts";
import { ProjectsContext } from "./Contexts";
import { loadProjects } from "./services/project";
import { IProject } from "./types";

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

  const handleChange = (id: string | undefined) => {
    const index = projects.findIndex((project) => project.id === id);
    setActiveIndex(index);
  };

  //ugh, issue with conditional rendering of addproject page
  const toggleAdd = () => {
    setAddProject(!addProject);
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
                  const spanStyles: CSS.Properties = index === activeIndex ? { position: "relative", left: "2px" } : {};
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
              {user && !addProject && !projects.length && <Default signedIn={true} />}
              {user && addProject && <AddProject />}
              {!user && <Default signedIn={false} />}
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
