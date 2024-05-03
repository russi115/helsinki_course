import Button from "./form/Button";
function Person({id, name, number, handle}) {
    return ( 
        <>
        <p>{name} {number}</p>
        <Button text={'Delete'} handle={handle}/>
        </>
     );
}

export default Person;