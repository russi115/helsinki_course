import Person from "./Person";
function Persons({ persons, filter }) {
  if (filter == "") {
    return (
      <>
        <h3>Numbers</h3>
        {persons.map((elem) => (
          <Person key={elem.id} name={elem.name} number={elem.number} />
        ))}
      </>
    );
  }
  return (
    <>
      <h3>Numbers</h3>
      {persons
        .filter((elem) => elem.name.toLowerCase().includes(filter))
        .map((elem) => (
          <Person key={elem.id} name={elem.name} number={elem.number} />
        ))}
    </>
  );
}

export default Persons;
