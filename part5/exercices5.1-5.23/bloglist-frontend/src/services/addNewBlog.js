import blogService from './blogs'

export const addBlog = (event, blogFormRef, newBlog, setBlogs, blogs, setMessage,setNewBlog) => {
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