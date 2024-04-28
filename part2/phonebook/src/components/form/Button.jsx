function Button(props) {
  return (
    <button onClick={props.handle} type="submit">
      {props.text}
    </button>
  );
}

export default Button;
