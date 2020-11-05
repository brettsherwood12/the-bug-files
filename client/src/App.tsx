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
import { IProject, IUser } from "./types";

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [user, setUser] = useState<IUser | null>(null);
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    //used any to shut ts up, find better fix
    if (user) {
      loadProjects((user as any).id)
        .then((data) => {
          setProjects(data);
        })
        .catch((error) => console.log(error));
    } else {
      setProjects([]);
    }
  }, [user]);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <ProjectsContext.Provider value={{ projects, setProjects, setActiveIndex }}>
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
                      onClick={() => setActiveIndex(index)}
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
                <span className="add-project" role="button" onClick={() => setActiveIndex(-1)}>
                  +
                </span>
              )}
            </div>
            <div className="project-active">
              {(user &&
                ((activeIndex === -1 && <AddProject />) ||
                  (projects.length > 0 && <Project project={projects[activeIndex]} />) || (
                    <Default signedIn={true} />
                  ))) || <Default signedIn={false} />}
            </div>
          </main>
        </ProjectsContext.Provider>
        <footer>
          <p className="signature">Created by Brett Sherwood</p>
        </footer>
      </UserContext.Provider>
    </div>
  );
};

export default App;
