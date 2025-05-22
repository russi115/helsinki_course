import { useState } from "react";
import blogService from '../services/blogs'

const BlogForm = ({blogs, setBlogs, counter}) =>{

  const [tittle, setTittle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const [message, setMessage ] = useState('');
  const [type, setType ] = useState('');

  const handleNewTittle = (event) => {
    setTittle(event.target.value);
  };
  const handleNewAuthor = (event) => {
    setAuthor(event.target.value);
  };
  const handleNewUrl = (event) => {
    setUrl(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const nameObject = {
      id: String(counter+1),
      title: tittle,
      author: author,
      url: url
    };

    try{
        blogService
      .create(nameObject)
      .then((response) => {
        setBlogs(blogs.concat(response))
        setTittle("");
        setAuthor("");
        setUrl("")

        setType('Noti')
        setMessage(
          `Blog ${response.tittle} was added!`
        )
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    }catch(exception){
      setType('Error')
      setMessage(
        `Failed in login!`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      // console.log(e)
    }
  };

  return(
        <form>
        <h2>Add a new!</h2>
            <Notification message={message} type={type}/>
            <Input text={'Tittle'} value={tittle} handle={handleNewTittle} />
            <Input text={'Author'} value={author} handle={handleNewAuthor} />
            <Input text={'Url'} value={url} handle={handleNewUrl} />
            <Button text={'Create'} handle={handleSubmit} />
        </form>
    )
}

function Input({text, value, handle}) {
  return (
    <>
      {text}:<input value={value} onChange={handle} />
    </>
  );
}

function Button({text, handle}) {
  return (
    <button onClick={handle} type="submit">
      {text}
    </button>
  );
}

function Notification({ message, type }) {
  // Si el mensaje es nulo, no renderizamos nada
  if (message === null) {
    return null;
  }

  // Seleccionamos el estilo basándonos en la prop 'type'
  // Usamos un switch o un condicional ternario para asignar el objeto de estilo correcto
  let currentStyle;
  if (type === 'Error') {
    currentStyle = Error;
  } else if (type === 'Noti') { // Usamos 'notification' para el tipo positivo
    currentStyle = Noti;
  } else {
    // Puedes definir un estilo por defecto o lanzar un error si el tipo no es reconocido
    currentStyle = {}; // Por defecto, sin estilos si el tipo es desconocido
  }

  // Aplicamos el objeto de estilo directamente al atributo 'style'
  return <div style={currentStyle}>{message}</div>;
}

const Error = {
  color: 'red',
  background: 'lightgrey',
  fontSize: '20px', // 'font-size' se convierte a camelCase 'fontSize'
  borderStyle: 'solid', // 'border-style' se convierte a camelCase 'borderStyle'
  borderRadius: '5px', // 'border-radius' se convierte a camelCase 'borderRadius'
  padding: '10px',
  marginBottom: '10px', // 'margin-bottom' se convierte a camelCase 'marginBottom'
};

const Noti = {
  color: 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
};

export default BlogForm