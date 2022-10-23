import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [submit, setSubmit] = useState(false);
  const [weather, setWeather] = useState(null);

  const cityInput = (event) => {
    event.preventDefault();
    setCity(event.target.value);
  };

  const displayTemperature = (response) => {
    setSubmit(true);
    setWeather({
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  };

  const weatherSubmit = (event) => {
    event.preventDefault();
    let apiKey = "bea8e5cfc09f2c80726c878f5fd81290";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);

    axios.get(apiUrl).then(displayTemperature);
  };

  // const result = () => {};

  const form = (
    <div className="weather">
      <h1>Weather App</h1>
      <form onSubmit={weatherSubmit}>
        <input
          type="search"
          placeholder="type a city....."
          onChange={cityInput}
        ></input>
        <input type="submit"></input>
      </form>
      {/* <div>{temperature}</div> */}
    </div>
  );

  if (submit) {
    return (
      <div>
        <div>{form}</div>
        <ul>
          <li>{city}</li>
          <li>Temperature: {weather.temperature}</li>
          <li>Humidity: {weather.humidity}</li>
          <li>Wind: {weather.wind}</li>
          <li>Description: {weather.description}</li>
        </ul>
      </div>
    );
  } else {
    return <div>{form}</div>;
  }
};

export default Weather;
