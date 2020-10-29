import React from "react";

interface IProps {
  user: boolean;
}

const Default = (props: IProps) => {
  return (
    <div className="project">
      <div className="project-header">
        {(props.user && <p>Add the projects that you're working on</p>) || (
          <p>Sign in/Sign up to start tracking your bugs</p>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Default;
