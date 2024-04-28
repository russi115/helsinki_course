import { useState } from "react";
import axios from 'axios'

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {

  axios
  .get('http://localhost:3001/persons')
  .then(response => setPersons(response.data))

  const [persons, setPersons] = useState([]);

  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("Enter a name...");
  const [newNumber, setNewNumber] = useState("Enter a phonenumber...");

  const hanldeSubmit = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (persons.filter((elem) => elem.name == nameObject.name).length != 0) {
      return alert(`${newName} is already exist!`);
    }
    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        text={"filter shown with"}
        value={filter}
        handle={handleFilter}
      />
      <PersonForm
        texts={["name", "number", "add"]}
        values={[newName, newNumber]}
        handles={[handleNewName, handleNewNumber, hanldeSubmit]}
      />
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;