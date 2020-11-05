import React, { useState, useContext } from "react";
import "./Bug.css";
import Comment from "../Comment/Comment";
import { deleteBug, editStatus, editDescription, addComment } from "../../services/bug";
import { BugsContext } from "../../Contexts";
import { IBug, FormEvent, SelectEvent } from "../../types";

interface IProps {
  bug: IBug;
  index: number;
}

const Bug = (props: IProps) => {
  const { bug } = props;

  const { bugs, setBugs } = useContext(BugsContext);

  const [comment, setComment] = useState("");
  const [description, setDescription] = useState(bug.description);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const newBug = await editDescription({ id: bug.id, description });
      const index = bugs.findIndex((item) => item.id === bug.id);
      const newBugs = [...bugs];
      newBugs[index] = newBug;
      setEditMode(false);
      setBugs(newBugs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await deleteBug(bug.id);
      const index = bugs.findIndex((item) => item.id === bug.id);
      const newBugs = [...bugs];
      newBugs.splice(index, 1);
      setBugs(newBugs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (event: SelectEvent) => {
    const status = event.target.value;
    try {
      const newBug = await editStatus({ id: bug.id, status });
      const index = bugs.findIndex((item) => item.id === bug.id);
      const newBugs = [...bugs];
      newBugs[index] = newBug;
      setBugs(newBugs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const newBug = await addComment({ bugId: bug.id, comment });
      const index = bugs.findIndex((item) => item.id === bug.id);
      const newBugs = [...bugs];
      newBugs[index] = newBug;
      setComment("");
      setBugs(newBugs);
    } catch (error) {
      console.log(error);
    }
  };

  const statusOptions = ["To Do", "Doing", "Done"].filter((option) => option !== bug.status);

  return (
    <tr key={bug.id}>
      <td>{(bug.status === "Done" && <del>{props.index + 1}.</del>) || <span>{props.index + 1}.</span>}</td>
      <td>
        <select value={bug.status} onChange={(event) => handleStatus(event)}>
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
        <form className="comment-form" onSubmit={handleComment}>
          <input
            type="text"
            placeholder="Comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </td>
      <td className="action-column">
        <button className="edit-button" onClick={() => setEditMode(!editMode)}>
          Edit
        </button>
        <form onSubmit={handleDelete}>
          <button className="delete-button">delete</button>
        </form>
      </td>
    </tr>
  );
};

export default Bug;
