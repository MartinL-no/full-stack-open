import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) => {
  const {name, capital, area, languages, flag, lat, long} = props

  const [showDetails, setShowDetails] = useState(false)
  const [weather, setWeather] = useState(false)
  const api_key = process.env.REACT_APP_API_KEY

  const languagesJsx = Object.values(languages).map(language => (
    <li key={language}>{language}</li>))

    useEffect(() => {
      if (showDetails) {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}
          `)
          .then(res => {
            setWeather({
                temp: res.data.main.temp,
                icon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
                wind: res.data.wind.speed,
              })
          })
      }
    }, [showDetails])

  function handleClick() {
    setShowDetails(!showDetails)
  }

  if  (!showDetails) {
    return (
      <>
        <p>{name}
          <button
            onClick={handleClick}
          >show</button>
        </p>  
      </>
    )
  } else {
    return (
      <>
        <h1>{name}
          <button onClick={handleClick}>hide</button>
        </h1>
        <p>capital {capital}</p>
        <p>area {area}</p>
        
        <strong>languages:</strong>
    
        <ul>
          {languagesJsx}
        </ul>
    
        <img src={flag}/>
        <h2>Weather in {name}</h2>
        <p>temperature {weather.temp} Celsius</p>
        <img src={weather.icon}/>
        <p>wind {weather.wind} m/s</p>
      </>
    )
  }
}

export default Country