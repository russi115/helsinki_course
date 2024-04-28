function Input(props) {
  return (
    <div>
      {props.text}:<input value={props.value} onChange={props.handle} />
    </div>
  );
}

export default Input;
