import Person from "./Person";
function Persons({ persons, filter, handle}) {
  if (filter == "") {
    return (
      <>
        <h3>Numbers</h3>
        {
        persons.map((elem) => (
          <>
          <Person key={elem.id} name={elem.name} number={elem.number} handle={() => handle(elem.id)}/>
          </>
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
          <>
          <Person key={elem.id} name={elem.name} number={elem.number} handle={() => handle(elem.id)}/>
          </>
        ))}
    </>
  );
}

export default Persons;
