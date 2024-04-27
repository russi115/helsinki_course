import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "+58 4142426505", id: 1 },
  ]);

  const [newName, setNewName] = useState("Enter a name...");
  const [newNumber, setNewNumber] = useState("Enter a phonenumber...");

  const hanldeSubmit = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    };

    const distintoDe = (elemento, indice, arreglo) => {
      return elemento.name != nameObject.name;
    };
    if (persons.every(distintoDe)) {
      setPersons(persons.concat(nameObject));
      setNewName("");
    } else {
      alert(`${newName} is already exist!`);
    }
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button onClick={hanldeSubmit} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((elem) => (
        <Person key={elem.id} name={elem.name} number={elem.number} />
      ))}
    </div>
  );
};

export default App;
