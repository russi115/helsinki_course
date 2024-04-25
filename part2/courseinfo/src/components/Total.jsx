function Total({ parts }) {
  let exercises = 0;
  parts.forEach((value) => (exercises += value.exercises));

  return <p style={{ fontWeight: "bold" }}>Total of {exercises} exercises.</p>;
}

export default Total;
