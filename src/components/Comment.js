import React from "react";
import { timeStampHoursAndMinutes } from "../utils/dateFormatting";
const Comment = props => {
  if (!props) {
    return null;
  }
  return (
    <article>
      <span className="comment--date">
        {timeStampHoursAndMinutes(props.date)}
      </span>
      <span className="comment--author">{props.user}:</span>
      <span className="comment--text">{props.content}</span>
    </article>
  );
};

export default Comment;
