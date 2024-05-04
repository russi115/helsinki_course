function Filter({text, value, handle}) {
    return ( 
        <div>
        {text}:<input value={value} onChange={handle} />
        </div>
     );
}

export default Filter;