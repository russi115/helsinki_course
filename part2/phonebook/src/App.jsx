import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("Enter a name...");

  const hanldeSubmit = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
    };

    const distintoDe = (elemento, indice, arreglo) => {
      return elemento.name != nameObject.name
    }
    if(persons.every(distintoDe)){
      setPersons(persons.concat(nameObject))
      setNewName("");
    }else{
      alert(`${newName} is already exist!`)
    }    
  };

  const handleOnchange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleOnchange} />
        </div>
        <div>
          <button onClick={hanldeSubmit} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((elem) => (
        <Person key={elem} name={elem.name} />
      ))}
    </div>
  );
};

export default App;
