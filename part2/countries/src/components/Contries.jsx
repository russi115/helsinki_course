import Country from "./Country";
function Contries({ array, showAll = false }) {
  if (showAll) {
    return (
      <>
        {array.map((e, index) => (
          <Country key={index + 1} country={e} type={"nameOnly"} />
        ))}
      </>
    );
  }
  if (array.length > 10) {
    return (
      <>
        <h3>Too many matches, specify another filter</h3>
      </>
    );
  } else if (array.length == 1) {
    return (
      <div>
        {array.map((elem, index) => (
          <Country key={index + 1} country={elem} />
        ))}
      </div>
    );
  } else if (array.length <= 10) {
    return (
      <div>
        {array.map((elem, index) => (
          <Country key={index + 1} country={elem} type={"nameOnly"} />
        ))}
      </div>
    );
  }
}

export default Contries;