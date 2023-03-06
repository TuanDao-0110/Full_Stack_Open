import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [state, setState] = useState(blog)
  const addLike = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      let newData = { ...state }
      newData.likes += 1
      try {
        const result = await blogService.update(blog.id, newData)
        setState({ ...result })
      } catch (error) {
        alert(error.message)
      }
    }
  }

  const [view, setView] = useState(false)
  const toogleView = () => {
    setView(!view)
  }

  return < div style={blogStyle} className='blog'>
    <div>
      <span>

        {state.title}
      </span>
      by author:
      <span>

        {state.author}
      </span>
      <button onClick={toogleView}>{view ? 'close' : 'view'}</button>
    </div>
    {
      view ?
        <>
          <p>

            author:   {state.author}
          </p>
          <p>
            likes:  {state.likes}  <button onClick={addLike}>like</button>
          </p>
          <p>
            url {state.url}
          </p>
          <button onClick={() => {
            deleteBlog(state.author, state.id)
          }}>Remove</button>
        </>
        : ''
    }
  </ div >

}




export default Blog

