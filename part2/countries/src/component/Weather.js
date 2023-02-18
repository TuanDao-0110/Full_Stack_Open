import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Weather = (props) => {
  const [weather, setWeather] = useState()
  const { name } = props
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(response => {
        if (response.status === 200) {

          setWeather(response.data)
        }
      })
  }, [])
  const render = (weather) => {
    return <>
      Temp: {weather?.main.temp.toFixed(1)}℃ | Max: {weather?.main.temp_max.toFixed(1)}℃
      <br />
      <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" width={80} />
      <br />
      Wind Speed : {weather?.wind.speed} m/s
    </>

  }
  return (
    <>
      <h3>Weather in {name.common}</h3>
      {render(weather)}
    </>
  )
}

export default Weather