import React from "react";

const Comment = props => {
  console.log(props);
  if (!props) {
    return null;
  }
  return (
    <article>
      <p>User:</p>
      <p>{props.content}</p>
      <p>time</p>
    </article>
  );
};

export default Comment;
