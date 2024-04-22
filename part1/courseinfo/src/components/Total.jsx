function Total(props){
    let exercises=0
    props.parts.forEach((value) => exercises += value.exercises)
    
    return(
        <>
            <p>Number of exercises {exercises} </p>
        </>
    )
}

export default Total