import React from "react";

const Alert = (props) => {
  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <i className="bi bi-exclamation-triangle me-2"></i> {props.message}
    </div>
  );
};

export default Alert;
