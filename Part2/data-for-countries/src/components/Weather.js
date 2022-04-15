import axios from "axios";
import {useState, useEffect} from 'react'

const Weather = ({capital}) => {

    const [weather, setWeather] = useState('')
    const [temp, setTemp] = useState('')

    //api_key = process.env.REACT_APP_API_KEY
    
    const weatherApi = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${process.env.REACT_APP_API_KEY}'
   const displayWeather = (
      <p>Temperature: {temp}</p>
    )
      
  useEffect(()=> {
    axios
    .get(weatherApi)
    .then((response) => {
      const weatherResponse = response.data
      setWeather(weatherResponse)
      setTemp(weatherResponse)
    })
  }, [displayWeather])


    
  return (
    <div>
        <h3>Weather in the for{capital}</h3>
        <p>{weather.length < 1 ? 'loading...' : displayWeather} </p>
    </div>
  )
}

export default Weather