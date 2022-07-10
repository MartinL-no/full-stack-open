import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from "./components/Country"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [value, setValue] = useState("")

  useEffect(()=> {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(res => {
        setCountries(res.data.map(country => {
          return {
            id: country.name.common,
            name: country.name.common,
            capital: country.capital,
            area: country.area,
            languages: country.languages,
            flag: country.flags.png,
            lat: country.latlng[0],
            long: country.latlng[1]
          }
      }))
      })
    }, [])
    
    function handleChange(event) {
      setValue(event.target.value)
      setFiltered(countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase())))
    }

  const searchResults = 
    filtered.length > 10
    ? <p>Too many matches, specify annother filter</p>
    : filtered.map(country => (
      <Country 
        key={country.id}
        name={country.name}
        capital={country.capital}
        area={country.area}
        languages={country.languages}
        flag={country.flag}
        lat={country.lat}
        long={country.long}
      />))
  return (
    <div>
      <span>find countries</span>
      <input
        value={value}
        onChange={handleChange}
      />
      {searchResults}
    </div>
  )
}

export default App