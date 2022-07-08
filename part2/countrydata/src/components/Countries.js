import { useEffect } from "react";
import axios from "axios";

const CountryDetails = ({ country, weather, setWeather }) => {
  const languages = Object.keys(country.languages).map(
    (key) => country.languages[key]
  );

  return (
    <>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <h3>Flag</h3>
      <img
        src={country.flags["svg"]}
        alt={`Flag of ${country.name.common}`}
        width={100}
      />
      <h3>Weather</h3>
      <Weather country={country} weather={weather} setWeather={setWeather} />
    </>
  );
};

const Weather = ({ country, weather, setWeather }) => {
  const capital = country.capital[0];
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${capital}&apiKey=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country]);

  return (
    <>
      <p>Temperature: {weather.main?.temp} °C</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Weather symbol"
      />
      <p>Wind: {weather.wind?.speed} m/s</p>
    </>
  );
};

const CountryList = ({ countries, showCountry }) => (
  <>
    {countries.map((country) => (
      <div key={country.name.common}>
        <p>
          {country.name.common}{" "}
          <button onClick={showCountry(country)}>Show</button>
        </p>
      </div>
    ))}
  </>
);

const Countries = ({
  countries,
  searchTerm,
  setSearchTerm,
  weather,
  setWeather,
}) => {
  let filteredCountries = [];

  const api_key = process.env.REACT_APP_WEATHER_API_KEY;

  const showCountry = (country) => {
    const showCountryWithName = () => setSearchTerm(country.name.common);
    return showCountryWithName;
  };

  if (searchTerm) {
    filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filteredCountries.length > 10) {
    return <p>Make the query more specific, there are too many matches.</p>;
  }

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];

    return (
      <CountryDetails
        country={country}
        weather={weather}
        setWeather={setWeather}
      />
    );
  }

  return (
    <CountryList countries={filteredCountries} showCountry={showCountry} />
  );
};
export default Countries;
