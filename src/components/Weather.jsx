import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import { Icon } from "../assets/Icon";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const weatherIcons = {
    "01d": Icon.dayClear_icon,
    "01n": Icon.nightClear_icon,
    "02d": Icon.cloudDay_icon,
    "02n": Icon.cloudNight_icon,
    "03d": Icon.scatteredCloud_icon,
    "03n": Icon.scatteredCloud_icon,
    "04d": Icon.brokenCloud_icon,
    "04n": Icon.brokenCloud_icon,
    "09d": Icon.showerRain_icon,
    "09n": Icon.showerRain_icon,
    "10d": Icon.rainDay_icon,
    "10n": Icon.rainNight_icon,
    "11d": Icon.stormDay_icon,
    "11n": Icon.stormNight_icon,
    "13d": Icon.snowDay_icon,
    "13n": Icon.snowNight_icon,
    "50d": Icon.mist_icon,
    "50n": Icon.mist_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please enter a City Name 🥰");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const showIcon = weatherIcons[data.weather[0].icon] || Icon.dayClear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        name: data.name,
        icon: showIcon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log("Error in fetchng weather data");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search(inputRef.current.value);
    }
  };

  useEffect(() => {
    search("VietNam");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          onKeyDown={handleKeyDown}
        />
        <img
          src={Icon.search_icon}
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} className="weather-icon" />
          <p className="temperature">{weatherData.temperature}℃</p>
          <p className="location">{weatherData.name}</p>
          <div className="weather-data">
            <div className="col">
              <img src={Icon.humidity_icon} />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={Icon.wind_icon} />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="error-data">
            <p>Oops! Something went wrong</p>
            <span>😥</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
