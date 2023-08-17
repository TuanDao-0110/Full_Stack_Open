import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Notification from '../components/Notification';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import blogService from '../services/blogs';
import { closeNote, openNote } from '../reducer/notificationReducer';
import { setNewBlog } from '../reducer/blogReducer';

export default function BlogList() {
    const { blogs } = useSelector(state => state.blogReducer)
    // const { user } = useSelector(state => state.userInfor)
    const dispatch = useDispatch();

    const blogFormRef = useRef();

    const showBlogsList = () => {
        if (blogs.length > 0) {
            let temp = [...blogs]
            return temp
                .sort((a, b) => a.likes - b.likes)
                .map((item, index) => {
                    return <div
                        style={{ border: '1px solid black', width: 'fit-content', padding: "0.2rem 1rem 0 1rem", marginBottom: '1rem' }}
                        key={index}>
                        {/* <a href={item.id} >{item.title}</a> */}
                        <Link to={item.id} state={item}>{item.title}</Link>
                    </div>
                })
        }
    }
    const addBlog = (newBlog) => {
        blogFormRef.current.toggleVisibility();
        blogService.create(newBlog).then((returnedBlog) => {
            console.log(returnedBlog)
            dispatch(setNewBlog(returnedBlog));
            dispatch(
                openNote({
                    type: 'success',
                    content: `${newBlog.title} have been added by ${newBlog.author}`
                })
            );
            setTimeout(() => {
                dispatch(closeNote());
            }, 5000);
        });
    };
    const blogForm = () => (
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
        </Togglable>
    );
    return (
        <div >
            <Notification />
            {blogForm()}
            <div style={{ marginTop: '1rem' }}>
                {showBlogsList()}
            </div>
        </div>
    )
}
