function Button({text, handle}) {
  return (
    <button onClick={handle} type="submit">
      {text}
    </button>
  );
}

export default Button;
