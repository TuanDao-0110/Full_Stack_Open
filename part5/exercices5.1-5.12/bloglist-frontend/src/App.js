import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [message, setMessage] = useState({
    type: '',
    content: null
  })
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs([...blogs]))
  }, [user])
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({
        type: 'error',
        content: 'wrong username or password'
      })

      setTimeout(() => {
        setMessage({
          type: null,
          content: ''
        })
      }, 5000)
    }
  }
  const loginForm = () => {


    return (
      <Togglable buttonLabel='show login' >
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </Togglable>

    )
  }


  const addBlog = (event) => {
    event.preventDefault()

    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage({
          type: 'success',
          content: `${newBlog.title} by ${newBlog.author}`
        })
        setNewBlog({
          author: '',
          title: '',
          url: ''
        })
        setTimeout(() => {
          setMessage({
            type: null,
            content: ''
          })
        }, 5000)
      })
  }
  const deleteBlog = async (author, id) => {
    const confirm = window.confirm(`Remove Blog Your're NOT gonna need it! By ${author}`)
    try {
      if (confirm) {
        await blogService.deleteBlog(id)
        alert(`deleted success blog by ${author}`)
        blogService.getAll().then(blogs => setBlogs([...blogs]))
      }
    } catch (error) {
      alert(error.response.data.error)
    }
  }
  const blogForm = () => (
    <Togglable buttonLabel="show add blog" ref={blogFormRef}>
      <BlogForm
        newBlog={newBlog}
        user={user}
        setUser={setUser}
        addBlog={addBlog}
        setNewBlog={setNewBlog} />
    </Togglable>
  )




  return (
    <div>
      <h2>log in to application</h2>
      <Notification message={message} />

      {user === null ?

        loginForm()




        : blogForm()}

      {
        user !== null && blogs.sort((a, b) => a.likes - b.likes).map(blog =>
          <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} />
        )
      }


    </div>
  )
}

export default App