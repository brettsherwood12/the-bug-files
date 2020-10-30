import React, { useState, useEffect } from "react";
import "./Table.css";
import Bug from "../Bug/Bug";
import { loadBugs } from "../../services/bug";
import { addBug } from "../../services/bug";
import { BugsContext } from "../../Contexts";
import { IBug } from "../../types";
import { FormEvent } from "../../types";

interface IProps {
  projectId: string | undefined;
}

const Table = (props: IProps) => {
  const { projectId } = props;

  const [bugs, setBugs] = useState<IBug[]>([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadBugs(projectId)
      .then((data) => {
        setBugs(data);
      })
      .catch((error) => console.log(error));
  }, [projectId]);

  const handleAddBug = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const bug = await addBug({ projectId, description });
      const newBugs = [...bugs, bug];
      setBugs(newBugs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BugsContext.Provider value={{ bugs, setBugs }}>
      <table>
        <thead>
          <tr>
            <th className="first-column">Bug</th>
            <th className="second-column">Status</th>
            <th className="third-column">Description</th>
            <th className="fourth-column">Comments</th>
            <th className="fifth-column">Action</th>
          </tr>
        </thead>
        <tbody>
          {bugs.length > 0 && bugs.map((bug: IBug, index) => <Bug key={bug.id} bug={bug} index={index} />)}
          <tr>
            <td>New</td>
            <td>To Do</td>
            <td>
              <textarea
                className="description-textarea"
                placeholder="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </td>
            <td>N/A</td>
            <td>
              <form onSubmit={handleAddBug}>
                <button type="submit">Add</button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </BugsContext.Provider>
  );
};

export default Table;
