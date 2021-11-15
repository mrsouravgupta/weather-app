import React from "react";

const DateTime = (props) => {
  return (
    <span className="datetime">
      {new Date(props.datetime).toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
  );
};

export default DateTime;
