

const BlogForm = ({ newBlog, addBlog, user, setUser, setNewBlog }) => {
  return <>
    {user.username} logged in {<button onClick={() => {
      localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    }}>log out</button>}
    <form onSubmit={addBlog}>
      <label>title</label>
      <input
        value={newBlog.title}
        onChange={(e) => {
          setNewBlog(prev => {
            return { ...prev, title: e.target.value }
          })
        }}
      />
      <br></br>
      <label>author</label>
      <input
        value={newBlog.author}
        onChange={(e) => {
          setNewBlog(prev => {
            return { ...prev, author: e.target.value }
          })
        }}
      />
      <br></br>

      <label>url</label>
      <input
        value={newBlog.url}
        onChange={(e) => {
          setNewBlog(prev => {
            return { ...prev, url: e.target.value }
          })
        }}
      />
      <br></br>
      <button type="submit">save</button>
    </form>
  </>
}

export default BlogForm