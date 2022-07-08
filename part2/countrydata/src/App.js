import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <h1>Country Data</h1>
      <input value={searchTerm} onChange={handleSearchTermChange} />
      <Countries
        countries={countries}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        weather={weather}
        setWeather={setWeather}
      />
    </>
  );
};

export default App;
