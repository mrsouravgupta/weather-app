import React from "react";

const initCap = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const convertSpeed = (speed, toUnit) => {
  if (toUnit === "imperial")
    return ` ${parseFloat(Number(speed) * 2.237).toFixed(1)} mph`;
  else return ` ${Number(speed)} m/s`;
};

const Description = (props) => {
  return (
    <div className="description d-flex flex-column pb-4 px-4">
      <span className="description-main">{initCap(props.main)}</span>
      <span>
        <i className="bi bi-droplet-half"></i> {props.humidity}%
        <i className="bi bi-wind ms-2"></i>
        {convertSpeed(props.wind, props.unit)}
      </span>
    </div>
  );
};

Description.defaultProps = {
  unit: "metric",
};

export default Description;
