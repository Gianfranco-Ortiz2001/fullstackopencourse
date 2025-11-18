const ShowCountry = ({ countriesToShow, showcasedCountry, onShow, weather }) => {

  if (showcasedCountry && weather) {
    const weatherImage = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
      <div>
        <h1>{showcasedCountry.name.common}</h1>

        <div>Capital: {showcasedCountry.capital[0]}</div>
        <h2>Languages</h2>

        <ul>
          {Object.values(showcasedCountry.languages).map((l, i) =>
            <li key={i}>{l}</li>
          )}
        </ul>

        <img
          src={showcasedCountry.flags.png}
          alt="flag"
          width="200"
        />
        <h2>Weather in {showcasedCountry.capital[0]}</h2>
        <div>Temperature {(weather.main.temp - 273.15).toString().slice(0,5)} Kelvin</div>
        <img
        src={weatherImage}
        />
        <div>Wind {weather.wind.speed}m/s</div>
      </div>
    );
  }

  if (countriesToShow.length > 10)
    return <div>Too many matches, specify another filter</div>;

  return (
    <div>
      {countriesToShow.map(p =>
        <div key={p.id}>
          {p.name}
          <button onClick={() => onShow(p.name)}>show</button>
        </div>
      )}
    </div>
  );
};

export default ShowCountry;
