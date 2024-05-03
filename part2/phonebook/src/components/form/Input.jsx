function Input(props) {
  return (
    <>
      {props.text}:<input value={props.value} onChange={props.handle} />
    </>
  );
}

export default Input;
