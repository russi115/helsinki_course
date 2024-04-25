import Part from "./Part";

function Content({ parts }) {
  return (
    <div>
      {parts.map(({ id, name, exercises }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
    </div>
  );
}

export default Content;
