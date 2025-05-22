import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import personsService from './services/persons'

import Blog from './components/Blog'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  //Get all blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //Get User from localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      personsService.setToken(user.token);
    }
  }, []);

  //Remove token from localStorage
  const handleLogout = () =>{
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const estilosDelContenedor = {
  display: 'flex',       // 'display' se mantiene igual
  alignItems: 'center',  // 'align-items' se convierte a camelCase 'alignItems'
  gap: '20px',           // 'gap' se mantiene igual
};

const estilosDelTitulo = {
  marginRight: '20px', // Igual que el anterior
};

const estilosDelParrafo = {
  display: 'inline-block', // 'inline-block' se mantiene igual
  verticalAlign: 'middle', // 'vertical-align' se convierte a camelCase 'verticalAlign'
};



  {if(user){
    return (
    <div>
      <div style={estilosDelContenedor}>
        <h2 style={estilosDelTitulo}>Welcome, {user.name}</h2>
        <button onClick={handleLogout} style={estilosDelParrafo}>Logout</button>
      </div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    )}else{
      return (
        <>
          <Login handleUser={setUser}/>
        </>
      )
    }
  }
}

export default App