import { useState, useEffect } from 'react'
import axios from 'axios'

const CountrySummary = (props) => {
  const countryData = props.filtered[0]
  const languages = Object.values(countryData.languages)

    return (
      <>
        <h1>{countryData.name.common}</h1>
        <p>capital {countryData.capital}</p>
        <p>area {countryData.area}</p>
      
        <strong>languages:</strong>
  
        <ul>
          {languages.map(language => (
            <li key={language}>{language}</li>))}
        </ul>
  
        <img src={countryData.flags.png}/>
      </>
    )
  console.log(test)
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [value, setValue] = useState("")

  useEffect(()=> {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  function handleChange(event) {
    setValue(event.target.value)
    setFiltered(countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase())))
  }

  const showCountries = filtered.length === 1
    ? <CountrySummary filtered={filtered}/>
    : filtered.length > 10
    ? <p>Too many matches, specify annother filter</p>
    : filtered.map(country => <p key={country.name.common}>{country.name.common}</p>)

  return (
    <div>
      <span>find countries</span>
      <input
        value={value}
        onChange={handleChange}
      />
      {showCountries}
    </div>
  )
}

export default App