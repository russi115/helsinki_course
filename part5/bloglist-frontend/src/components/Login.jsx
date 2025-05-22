import { useState } from 'react'
import loginService from '../services/Login'
import personsService from '../services/persons'

const Login = ({handleUser}) => {
    
    const [username, SetUsername] = useState('')
    const [password, SetPassword] = useState('')
    
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
            personsService.setToken(user.token)
            handleUser(user);
            SetUsername('');
            SetPassword('');
        }catch (exception){
            // setErrorMessage('Wrong credentials')
            // setTimeout(() => {
            //     setErrorMessage("timeout")
            // }, 5000)
            console.log(exception)
        }
        console.log('Loggin...', username, password);
    }

    return(
        <form>
            <h2>Login</h2>
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

export default Login
