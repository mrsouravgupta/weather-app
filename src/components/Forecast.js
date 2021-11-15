import React from "react";
import Temperature from "./Temperature";
import Icon from "./Icon";

const Forecast = (props) => {
  return (
    <span
      className={
        "d-flex flex-column align-items-center px-3 py-1 forecast" +
        (props.active ? " active" : "")
      }
      id={"forecast-" + props.id}
      onClick={props.handleForecastClick}
    >
      <span>{props.forecastData.day}</span>
      <Icon description={props.forecastData.icon.description} small={true} />
      <Temperature
        magnitude={props.forecastData.temperature.magnitude}
        small={true}
        unit={props.unit}
      />
    </span>
  );
};

export default Forecast;
