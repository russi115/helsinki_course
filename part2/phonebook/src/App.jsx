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
      id: String(persons.length+1),
      name: newName,
      number: newNumber
    };

    if (persons.filter((elem) => elem.name == nameObject.name).length != 0) {
      if(window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)){
        let nameObject = {
          name: newName,
          number: newNumber
        }
        personService
        .update(persons.filter((elem) => elem.name == nameObject.name)[0].id, nameObject)
        .then((response) => {
          let newArr = [...persons]
          newArr.filter((elem) => elem.name == response.name)[0].number = response.number
          setPersons(newArr)
          setNewName("")
          setNewNumber("")
        })
      }
    }else{
      personService
      .create(nameObject)
      .then((response) => {
        setPersons(persons.concat(response))
        setNewName("");
        setNewNumber("");
      })
    }
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