import React, { useEffect, useState } from "react";
import Temperature from "./Temperature";
import Icon from "./Icon";
import Description from "./Description";
import Location from "./Location";
import DateTime from "./DateTime";
import axios from "axios";
import Alert from "./Alert";
import ForecastGroup from "./ForecastGroup";

const appid = "81d1a9337821195629663a1655fb2cd4";

const fetchWeatherData = (cityName) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${appid}`
  );
};

const fetchWeatherForecastData = (cityName) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${appid}`
  );
};

const Weather = (props) => {
  const [weatherData, setWeatherData] = useState("");
  const [weatherForecastData, setWeatherForecastData] = useState("");
  const [activeForecast, setActiveForecast] = useState(0);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("Pune");
  const [searching, setSearching] = useState(false);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    setSearching(true);
    const timeoutId = setTimeout(() => {
      fetchWeatherData(query)
        .then((response) => {
          setWeatherData({
            name: response.data.name,
            datetime: new Date(),
            temperature: { magnitude: response.data.main.temp },
            description: {
              main: response.data.weather[0].description,
              humidity: response.data.main.humidity,
              wind: response.data.wind.speed,
            },
            icon: { description: response.data.weather[0].main },
          });
          setSuccess(query);
          setActiveForecast(0);
          setSearching(false);
        })
        .catch((error) => {
          setError(error);
          setSearching(false);
        });
      fetchWeatherForecastData(query)
        .then((response) => setWeatherForecastData(response))
        .catch((error) => {});
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleForecastClick = (event) => {
    const forecastIdx = event.currentTarget.id.split("-")[1];
    const forecast = weatherForecastData.data.list[forecastIdx * 8];
    setWeatherData({
      name: weatherForecastData.data.city.name,
      datetime: forecast.dt_txt,
      temperature: { magnitude: forecast.main.temp },
      description: {
        main: forecast.weather[0].description,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
      },
      icon: { description: forecast.weather[0].main },
    });
    setActiveForecast(forecastIdx);
  };

  const handleCelsiusClick = (event) => setUnit("metric");

  const handleFahrenheitClick = (event) => setUnit("imperial");

  return (
    weatherData && (
      <div className="weather d-flex flex-column align-items-center justify-content-between">
        <div
          className="d-flex flex-column align-items-center"
          style={{ width: "90%" }}
        >
          <div className="input-group mt-4 mb-4">
            <input
              className="form-control search"
              type="text"
              name="query"
              placeholder="Search"
              data-testid="custom-element"
              autoComplete="off"
              onChange={(event) => {
                setQuery(
                  event.target.value === "" ? success : event.target.value
                );
                setError("");
              }}
            />
            <span className="input-group-text">
              {searching && (
                <span
                  className="spinner-border spinner-border-sm text-primary"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
            </span>
          </div>
          {error && <Alert message="City not found" />}
          <Location
            city={
              weatherData.name +
              (weatherForecastData
                ? `, ${weatherForecastData.data.city.country}`
                : "")
            }
          />
          <DateTime datetime={weatherData.datetime} />
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex flex-row align-items-center">
            <Temperature
              magnitude={weatherData.temperature.magnitude}
              unit={unit}
              handleCelsiusClick={handleCelsiusClick}
              handleFahrenheitClick={handleFahrenheitClick}
            />
            <div className="d-flex flex-column justify-content-between text-center">
              <Icon description={weatherData.icon.description} />
              <Description
                main={weatherData.description.main}
                humidity={weatherData.description.humidity}
                wind={weatherData.description.wind}
                unit={unit}
              />
            </div>
          </div>
          {weatherForecastData && (
            <ForecastGroup
              forecastList={weatherForecastData.data.list}
              handleForecastClick={handleForecastClick}
              activeForecast={activeForecast}
              unit={unit}
            />
          )}
        </div>
      </div>
    )
  );
};

export default Weather;
