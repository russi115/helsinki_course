import Input from "./form/Input";
function Filter(props) {
    return ( 
        <Input text={props.text} value={props.value} handle={props.handle}/>
     );
}

export default Filter;