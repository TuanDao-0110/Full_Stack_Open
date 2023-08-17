import React from 'react'
// import Blog from '../components/Blog';
// import Notification from '../components/Notification';
import { useState } from 'react';
// import BlogForm from '../components/BlogForm';
import LoginForm from '../components/LoginForm';
import Togglable from '../components/Togglable';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { useDispatch } from 'react-redux';
import { closeNote, openNote } from '../reducer/notificationReducer';
import { useSelector } from 'react-redux';
// import {  setAllBlog, setNewBlog } from '../reducer/blogReducer';
import { addUser } from '../reducer/userInfor';
// import Blog from '../components/Blog';

export default function Home() {
    // const { blogs } = useSelector((state) => state.blogReducer);
    const { user } = useSelector(state => state.userInfor)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const blogFormRef = useRef();
    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password
            });
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
            blogService.setToken(user.token);
            // setUser(user);
            dispatch(addUser(user))
            setUsername('');
            setPassword('');
        } catch (exception) {
            // setMessage({
            //   type: 'error',
            //   content: 'wrong username or password'
            // });
            dispatch(
                openNote({
                    type: 'error',
                    content: 'wrong username or password'
                })
            );
            setTimeout(() => {
                // setMessage({
                //   type: null,
                //   content: ''
                // });
                dispatch(closeNote());
            }, 5000);
        }
    };
    const loginForm = () => {
        return (
            <Togglable buttonLabel="show login">
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleLogin={handleLogin}
                />
            </Togglable>
        );
    };

    // const addBlog = (newBlog) => {
    //     blogFormRef.current.toggleVisibility();
    //     blogService.create(newBlog).then((returnedBlog) => {
    //         dispatch(setNewBlog(returnedBlog));
    //         dispatch(
    //             openNote({
    //                 type: 'success',
    //                 content: `${newBlog.title} by ${newBlog.author}`
    //             })
    //         );
    //         setTimeout(() => {
    //             dispatch(closeNote());
    //         }, 5000);
    //     });
    // };
    // const deleteBlog = async (author, id) => {
    //     const confirm = window.confirm(`Remove Blog Your're NOT gonna need it! By ${author}`);
    //     try {
    //         if (confirm) {
    //             await blogService.deleteBlog(id);
    //             alert(`deleted success blog by ${author}`);
    //             // blogService.getAll().then((blogs) => setBlogs([...blogs]));
    //             blogService.getAll().then((blogs) => dispatch(setAllBlog([...blogs])));
    //         }
    //     } catch (error) {
    //         alert(error.response.data.error);
    //     }
    // };
    // const blogForm = () => (
    //     <Togglable buttonLabel="show add blog" ref={blogFormRef}>
    //         <BlogForm user={user} createBlog={addBlog} />
    //     </Togglable>
    // );
    // const updateLike = (newBlogs) => {
    //     const temp = [...blogs];
    //     let index = temp.findIndex((blog) => blog.id === newBlogs.id);
    //     temp[index].likes++;
    //     dispatch(setAllBlog([...temp]))
    // };
    // const sortBlogs = () => {
    //     if (blogs.length > 0) {
    //         let temp = [...blogs]
    //         temp.sort((a, b) => a.likes - b.likes)
    //         return temp
    //             ?.map((blog) => (
    //                 <Blog
    //                     key={blog.id}
    //                     blog={blog}
    //                     deleteBlog={deleteBlog}
    //                     updateLike={updateLike}
    //                 />
    //             ))
    //     }
    // }
    return (
        <div>
            <h1>Blogs Application</h1>
            {/* <Notification /> */}
            {/* {user === null ? loginForm() : blogForm()}
            {user !== null && sortBlogs()} */}
            {

                user === null && loginForm()
            }
        </div>
    )
}
