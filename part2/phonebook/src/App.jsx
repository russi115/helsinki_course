import { useState, useEffect } from "react";
import personService from './services/persons'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

import Input from "./components/form/Input";

const App = () => {

  const hook = () => {
    personService
    .getAll()
    .then(reponse => setPersons(reponse))
  }
  useEffect(hook, [])

  const [persons, setPersons] = useState([]);

  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("Enter a name...");
  const [newNumber, setNewNumber] = useState("Enter a phonenumber...");

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameObject = {
      id: String(persons.length),
      name: newName,
      number: newNumber
    };

    if (persons.filter((elem) => elem.name == nameObject.name).length != 0) {
      return alert(`${newName} is already exist!`);
    }
    personService
      .create(nameObject)
      .then((response) => {
        setPersons(persons.concat(response))
        setNewName("");
        setNewNumber("");
      })
  };

  const handleDelete = id => {  
    if ( window.confirm(`Delete ${persons.filter((e) => e.id == id)[0].name}?`) ){
      personService
      .remove(id)
      .then((response) => {
        setPersons(persons.filter(elem => elem.id !== response.id ))
      })
    }
  }

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
      <Input
        text={"filter shown with"}
        value={filter}
        handle={handleFilter}
      />
      <PersonForm
        texts={["name", "number", "add"]}
        values={[newName, newNumber]}
        handles={[handleNewName, handleNewNumber, handleSubmit]}
      />
      <Persons persons={persons} filter={filter} handle={handleDelete}/>
    </div>
  );
};

export default App;