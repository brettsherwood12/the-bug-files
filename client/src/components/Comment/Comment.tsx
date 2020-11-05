import React, { useContext } from "react";
import "./Comment.css";
import { deleteComment } from "../../services/bug";
import { BugsContext } from "../../Contexts";
import { IComment, FormEvent } from "../../types";

interface IProps {
  data: IComment;
}

const Comment = (props: IProps) => {
  const { data } = props;

  const { bugs, setBugs } = useContext(BugsContext);

  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const newBug = await deleteComment({ bugId: data.bugId, comment: data.comment });
      const index = bugs.findIndex((item) => item.id === data.bugId);
      const newBugs = [...bugs];
      newBugs[index] = newBug;
      setBugs(newBugs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li>
      <div className="comment">
        <span>{data.comment}</span>
        <form onSubmit={handleDelete}>
          <button className="delete-button" type="submit">
            X
          </button>
        </form>
      </div>
    </li>
  );
};

export default Comment;
