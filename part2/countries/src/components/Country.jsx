import Weather from "./Weather";
function Country({ country, type, weather = false }) {
  if (type == "nameOnly" && weather==false) {
    return (
      <div>
        <p>{country.name.official}</p>
      </div>
    );
  } else if (weather) {
    return (
      <div>
        <h2>{country.name.official}</h2>
        <p>Capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <p>
          languages:{" "}
          {Object.values(country.languages).map((lan) => (
            <li>{lan}</li>
          ))}
        </p>
        <img src={country.flags.png} alt={country.flags.alt} />
        <Weather capital={country.capital}/>
      </div>
    );
  } else {
    return (
      <div>
        <h2>{country.name.official}</h2>
        <p>Capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <p>
          languages:{" "}
          {Object.values(country.languages).map((lan) => (
            <li>{lan}</li>
          ))}
        </p>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    );
  }
}

export default Country;
