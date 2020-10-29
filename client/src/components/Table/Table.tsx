import React, { useState, useEffect, useContext } from "react";
import "./Table.css";
import { loadBugs } from "../../services/bug";
import { addBug } from "../../services/bug";
import { deleteBug } from "../../services/bug";
import { UserContext } from "../../contexts/UserContext";

interface IProps {
  projectId: string;
}

interface IBug {
  id: string;
  description: string;
  status: string;
}

type Event = React.FormEvent<HTMLFormElement>;

const Table = (props: IProps) => {
  const { user } = useContext(UserContext);

  const [bugs, setBugs] = useState([]);
  const [description, setDescription] = useState("");

  const { projectId } = props;

  useEffect(() => {
    loadBugs(projectId)
      .then((data) => {
        setBugs(data);
      })
      .catch((error) => console.log(error));
  }, [bugs, projectId]);

  const handleDelete = async (event: Event, id: string) => {
    event.preventDefault();
    try {
      const result = await deleteBug(id);
      if (result.deleted) console.log("successfully deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = (event: Event) => {
    event.preventDefault();
    try {
      if (user) {
        addBug({ projectId, description });
      } else {
        throw new Error("You need to be logged in to add a bug");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        {bugs.length > 0 &&
          bugs.map((bug: IBug, index) => {
            let options = ["To Do", "Doing", "Done"].filter((option) => option !== bug.status);
            return (
              <tr>
                <td>{index + 1}.</td>
                <td>
                  <select name="status" id="status-select">
                    <option value={bug.status}>{bug.status}</option>
                    <option value={options[0]}>{options[0]}</option>
                    <option value={options[1]}>{options[1]}</option>
                  </select>
                </td>
                <td>{bug.description}</td>
                <td>
                  <textarea></textarea>
                </td>
                <td>
                  <form onSubmit={(event) => handleDelete(event, bug.id)}>
                    <button className="delete-button">delete</button>
                  </form>
                </td>
              </tr>
            );
          })}
        <tr>
          <td>New:</td>
          <td>To Do</td>
          <td>
            <textarea
              className="description-textarea"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </td>
          <td>
            <textarea placeholder="Add comments after adding bug" />
          </td>
          <td>
            <form onSubmit={handleAdd}>
              <button type="submit">Add bug</button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
