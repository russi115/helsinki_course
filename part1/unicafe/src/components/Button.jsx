function Button({text, handle}){
    return(
        <button onClick={handle}>{text}</button>
    )
}

export default Button