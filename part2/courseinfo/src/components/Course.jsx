import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

function Course({ courses }) {
  return (
    <div>
      {courses.map(({ name, parts, id }) => (
        <div key={id}>
          <Header name={name} />
          <Content parts={parts} />
          <Total parts={parts} />
        </div>
      ))}
    </div>
  );
}

export default Course;
