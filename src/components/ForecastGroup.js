import React from "react";
import Forecast from "./Forecast";

const ForecastGroup = (props) => {
  let activeForecastList = [false, false, false, false, false];
  activeForecastList[props.activeForecast] = true;

  let forecastList = [];
  props.forecastList.map((forecast, idx) => {
    return (
      idx % 8 === 0 &&
      forecastList.push({
        day: new Date(forecast.dt_txt).toLocaleDateString("en-IN", {
          weekday: "short",
        }),
        temperature: { magnitude: forecast.main.temp },
        description: {
          main: forecast.weather[0].description,
          humidity: forecast.main.humidity,
          wind: forecast.wind.speed,
        },
        icon: { description: forecast.weather[0].main },
      })
    );
  });
  return (
    <div className="d-flex flex-row justify-content-between">
      {forecastList.map((forecast, idx) => (
        <Forecast
          key={idx}
          id={idx}
          active={activeForecastList[idx]}
          forecastData={forecast}
          handleForecastClick={props.handleForecastClick}
          unit={props.unit}
        />
      ))}
    </div>
  );
};

ForecastGroup.defaultProps = {
  activeForecast: 0,
};

export default ForecastGroup;
