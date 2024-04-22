import Part from "./Part"

function Content(props){
    return(
        <div>
           {props.parts.map((value, index) => 
            <Part key={index} part={value.name} exercises={value.exercises}/>
           )}
        </div>
    )
}

export default Content