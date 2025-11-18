import { useState, useEffect } from "react"
import ShowCountry from "./components/ShowCountry"
import countriesService from "./services/countries"
import weatherService from "./services/weather"

const App = ({_countries}) => {
  const [showcasedCountry, setShowcasedCountry] = useState(null)
  const [country, setCountry] = useState('')
  const [weather, setWeather] = useState(null)
  const countriesToShow = _countries.filter(c =>
    c.name.toLowerCase().includes(country.toLowerCase())
  )

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const handleShow = (name) => {
    countriesService
    .getByName(name)
    .then(
      data => setShowcasedCountry(data)
    )
    if(showcasedCountry){
      weatherService
      .getByName(showcasedCountry.capital[0],showcasedCountry.tld[0].slice(-2))
      .then(data => setWeather(data))
    }
  }

  useEffect(() => {
  if (countriesToShow.length === 1) {
    const name = countriesToShow[0].name;

    if (!showcasedCountry || showcasedCountry.name.common !== name) {
      handleShow(name);
    }
  }
}, [countriesToShow, showcasedCountry]);

  return (
    <div>
      <div>
        find country <input
        value={country}
        onChange={handleCountryChange}
        />
      </div>
      <ShowCountry 
      countriesToShow={countriesToShow} 
      showcasedCountry={showcasedCountry}
      weather={weather}
      onShow={handleShow}
      />
    </div>
  )
}

export default App