import { useState, useEffect } from "react";
import openweather from "../services/openweather";
import Notification from "./Notification";
function Weather({ capital }) {
  const [done, setDone] = useState(false);
  const [weather, setWeather] = useState({});
  const [message, setMessage ] = useState(null);
  const [type, setType ] = useState('none');
  const hook = () => {
    openweather
    .getWeather(capital)
    .then(( response) => {
      setWeather(response);
      setDone(true);
    })
    .catch(error => {
        console.log(error);
        setMessage(
          'Weather is not available!'
        )
        setType('error')
        setTimeout(() => {
          setMessage(null)
          setType('none')
        }, 10000)
      })
  };
  useEffect(hook, []);
  if (done) {
    return (
      <>
        <h2>Weather in {capital}</h2>
        <p>Temperature {weather.main.temp} Fahrenheit</p>
        <p>Wind {weather.wind.speed} m/s</p>
        <h3>{weather.weather[0].description}</h3>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="openweather icon"
        />
      </>
    );
  } else {
    return (
        <>
        <div className="loader"></div>
        <p>loading weather...</p>
        <Notification message={message} type={type}/>
        </>
    )
  }
}

export default Weather;
