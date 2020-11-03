import React, { useState, useContext } from "react";
import "./Bug.css";
import Comment from "../Comment/Comment";
import { deleteBug, editStatus, editDescription, addComment } from "../../services/bug";
import { BugsContext } from "../../Contexts";
import { IBug } from "../../types";
import { FormEvent } from "../../types";
import { SelectEvent } from "../../types";

//am I overcomplicating these actions? I could just make updates in this component... seems like
//bugs array in table should be updated too but does that automatically trigger a re-render here?

interface IProps {
  bug: IBug;
  index: number;
}

const Bug = (props: IProps) => {
  const { bug } = props;

  const { bugs, setBugs } = useContext(BugsContext);

  const [comment, setComment] = useState("");
  const [description, setDescription] = useState(bug.description);
  const [status, setStatus] = useState(bug.status);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const newBug = await editDescription({ id: bug.id, description });
      const index = bugs.findIndex((item) => item.id === bug.id);
      const newBugs = [...bugs].splice(index, 1);
      //in context file ts yells if setProjects doesn't have | null, but I don't think it can be null ever
      //deletes bug but re-render without bug in table not working
      if (setBugs) setBugs(newBugs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const data = await deleteBug(bug.id);
      if (data.deleted) {
        const index = bugs.findIndex((item) => item.id === bug.id);
        const newBugs = [...bugs].splice(index, 1);
        //in context file ts yells if setProjects doesn't have | null, but I don't think it can be null ever
        //deletes bug but re-render without bug in table not working
        if (setBugs) setBugs(newBugs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = async (event: SelectEvent) => {
    event.preventDefault();
    console.log(status);
    setStatus(event.target.value);
    console.log(event.target.value);
    console.log(status);
    //sending previous renders status to server, setStatus doesn't happen in time for API call or something...
    try {
      const newBug = await editStatus({ id: bug.id, status });
      const index = bugs.findIndex((item) => item.id === bug.id);
      const newBugs = [...bugs].splice(index, 1, newBug);
      //in context file ts yells if setProjects doesn't have | null, but I don't think it can be null ever
      if (setBugs) setBugs(newBugs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const newBug = await addComment({ bugId: bug.id, comment });
      const index = bugs.findIndex((item) => item.id === bug.id);
      const newBugs = [...bugs].splice(index, 1, newBug);
      //in context file ts yells if setProjects doesn't have | null, but I don't think it can be null ever
      if (setBugs) setBugs(newBugs);
    } catch (error) {
      console.log(error);
    }
  };

  const statusOptions = ["To Do", "Doing", "Done"].filter((option) => option !== bug.status);

  return (
    <tr key={bug.id}>
      <td>{props.index + 1}.</td>
      <td>
        <select id="status-select" value={status} onChange={(event) => handleChangeStatus(event)}>
          <option value={bug.status}>{bug.status}</option>
          <option value={statusOptions[0]}>{statusOptions[0]}</option>
          <option value={statusOptions[1]}>{statusOptions[1]}</option>
        </select>
      </td>
      <td>
        {(editMode && (
          <form onSubmit={handleEdit}>
            <textarea
              className="description-textarea"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        )) ||
          (bug.status === "Done" && <del>{bug.description}</del>) || <span>{bug.description}</span>}
      </td>
      <td>
        <ul className="comments-list">
          {bug.comments &&
            bug.comments.map((comment, index) => <Comment key={index} data={{ bugId: bug.id, comment }} />)}
        </ul>
        <form className="comment-form" onSubmit={handleAddComment}>
          <input
            type="text"
            placeholder="Comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </td>
      <td>
        <button onClick={() => setEditMode(!editMode)}>Edit</button>
        <form onSubmit={handleDelete}>
          <button className="delete-button">delete</button>
        </form>
      </td>
    </tr>
  );
};

export default Bug;
