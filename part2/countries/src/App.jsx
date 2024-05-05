import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import Filter from "./components/Filter";
import Contries from "./components/Contries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const hook = () => {
    countriesService.getAll().then((response) => setCountries(response));
  };
  useEffect(hook, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  if(countries.length != 0){
    if (filter != "") {
      return (
        <>
          <h1>Countries</h1>
          <Filter text={"find countries"} value={filter} handle={handleFilter} />
          <Contries array={countries.filter((elem) =>elem.name.official.toLowerCase().includes(filter.toLowerCase()))} />
        </>
      );
    } else {
      return (
        <>
          <h1>Countries</h1>
          <Filter text={"find countries"} value={filter} handle={handleFilter} />
          <Contries array={countries} showAll={true} />
        </>
      );
    }
  }else{
    return (
      <>
      <div className="loader"></div>
      <p>Loading...</p>
      </>
    )
  }
}

export default App;
