import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../reducer/userInfor';

const BlogForm = ({ createBlog, user }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: ''
    });
const dispatch = useDispatch()
    const addBlog = (event) => {
        event.preventDefault();
        createBlog({ ...newBlog });
        setNewBlog({
            title: '',
            author: '',
            url: ''
        });
    };
    return (
        <>
            {user.username} logged in{' '}
            {
                <button
                    onClick={() => {
                        localStorage.removeItem('loggedBlogappUser');
                        // setUser(null);
                        dispatch(removeUser())
                    }}
                >
                    log out
                </button>
            }
            <h2>new blog</h2>
            <form onSubmit={addBlog}>
                <label>title</label>
                <input
                    id="title"
                    value={newBlog.title}
                    onChange={(e) => {
                        setNewBlog((prev) => {
                            return { ...prev, title: e.target.value };
                        });
                    }}
                />
                <br></br>
                <label>author</label>
                <input
                    id="author"
                    value={newBlog.author}
                    onChange={(e) => {
                        setNewBlog((prev) => {
                            return { ...prev, author: e.target.value };
                        });
                    }}
                />
                <br></br>

                <label>url</label>
                <input
                    id="url"
                    value={newBlog.url}
                    onChange={(e) => {
                        setNewBlog((prev) => {
                            return { ...prev, url: e.target.value };
                        });
                    }}
                />
                <br></br>
                <button type="submit" id="submit">
                    save
                </button>
            </form>
        </>
    );
};

export default BlogForm;
