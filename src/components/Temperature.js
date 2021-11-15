import React from "react";

const convert = (magnitude, toUnit) => {
  if (toUnit === "imperial") return (Number(magnitude) * 9) / 5 + 32;
  else return Number(magnitude);
};

const Temperature = (props) => {
  return (
    <div className={"temperature" + (props.small ? "" : " p-4")}>
      <span className={"temperature-magnitude" + (props.small ? "-sm" : "")}>
        {props.small
          ? parseFloat(convert(props.magnitude, props.unit)).toFixed(2)
          : Math.round(convert(props.magnitude, props.unit))}
      </span>
      <span className={"temperature-unit" + (props.small ? "-sm" : "")}>
        {props.small ? (
          <span>°</span>
        ) : (
          <span>
            <span
              className={
                "clickable" + (props.unit === "metric" ? " active" : "")
              }
              onClick={props.handleCelsiusClick}
            >
              °C
            </span>
            <span> | </span>
            <span
              className={
                "clickable" + (props.unit === "imperial" ? " active" : "")
              }
              onClick={props.handleFahrenheitClick}
            >
              °F
            </span>
          </span>
        )}
      </span>
    </div>
  );
};

Temperature.defaultProps = {
  small: false,
  unit: "metric",
};

export default Temperature;
