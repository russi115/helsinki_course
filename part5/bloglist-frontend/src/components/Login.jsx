import { useState } from 'react'
import loginService from '../services/Login'
import blogService from '../services/blogs'

const Login = ({handleUser}) => {
    
    const [username, SetUsername] = useState('')
    const [password, SetPassword] = useState('')

    const [message, setMessage ] = useState('');
    const [type, setType ] = useState('');
    
    const handleChangeUsername = (event) => {
        SetUsername(event.target.value);
    }
    const handleChangePassword = (event) => {
        SetPassword(event.target.value);
    }
    
    const handleLogin =  async (event) => {
        event.preventDefault();
    
        try {
            const user = await loginService.login({ username, password });
            
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)      
            ) 
            blogService.setToken(user.token)
            handleUser(user);
            SetUsername('');
            SetPassword('');
        }catch (exception){
            // setErrorMessage('Wrong credentials')
            // setTimeout(() => {
            //     setErrorMessage("timeout")
            // }, 5000)
            setType('Error')
            setMessage(
              `Failed in login!`
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
        }
        console.log('Loggin...', username, password);
    }

    return(
        <form>
            <h2>Login</h2>
            <Notification message={message} type={type} />
            <Input text={'Username'} value={username} handle={handleChangeUsername} />
            <Input text={'Password'} value={password} handle={handleChangePassword} />
            <Button text={'Sign in'} handle={handleLogin} />
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


export default Login
