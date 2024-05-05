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

  const handleOnClick = (event) => { 
    const info = document.getElementById(event.name.official)
    info.className == 'none'?info.className='show':info.className='none'
  }

  if(countries.length != 0){
    if (filter != "") {
      return (
        <>
          <h1>Countries</h1>
          <Filter text={"find countries"} value={filter} handle={handleFilter} />
          <Contries array={countries.filter((elem) =>elem.name.official.toLowerCase().includes(filter.toLowerCase()))}  handle={handleOnClick}/>
        </>
      );
    } else {
      return (
        <>
          <h1>Countries</h1>
          <Filter text={"find countries"} value={filter} handle={handleFilter} />
          <Contries array={countries} showAll={true} handle={handleOnClick} />
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
