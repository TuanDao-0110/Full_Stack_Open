import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { setNewBlog } from '../reducer/blogReducer';
import blogService from '../services/blogs';
import { getAllComment } from '../reducer/commentReducer';

export default function BlogDetails() {
    const [comment, setComment] = useState('')
    let { state } = useLocation()
    const { blogs } = useSelector((state) => state.blogReducer);
    const comments = useSelector(state => state.commentReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        getComment()
    }, [])
    const addLike = async () => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            blogService.setToken(user.token);
            let index = blogs.findIndex(blog => blog.id === state.id)
            let newData = { ...blogs[index] }
            newData.likes += 1
            try {
                const result = await blogService.update(state.id, newData);
                dispatch(setNewBlog(result))
            } catch (error) {
                alert(error.message);
            }
        }
    };
    const getComment = async () => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            // dispatch(addUser(user))
            blogService.setToken(user.token);
            blogService.getComment(state.id).then((comment) => {
                dispatch(getAllComment(comment.data.comments.listComments))
            }
            );
        }
    }

    const renderComment = () => {
        return comments.listComments ? comments?.listComments.map((item, index) => {
            return <p key={index}>{item}</p>
        }) :
            <></>
    }
    const addNewComment = () => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            blogService.setToken(user.token);
            blogService.addComment(state.id, comment).then((comment) => {
                dispatch(getAllComment(comment.data.listComments))
                setComment('')
            }
            );
        }
    }
    const renderBlogs = () => {
        return blogs.map((item, index) => {
            if (state.id === item.id)
                return <div className="blog" key={index} >
                    <div>
                        <h3>Blog details</h3>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        <span >{item.title}</span> by author:{item.author}
                    </div>
                    <div>
                        <p>author: {item.author}</p>
                        <p>
                            likes: {item.likes} <button onClick={addLike}>like</button>
                        </p>
                        <p>
                            url : <a href={item.url}>
                                {item.url}
                            </a>
                        </p>
                        <p>
                            add by {item.user.name}
                        </p>
                    </div>
                    <div>
                        <h2>Comments</h2>
                        <div>
                            <input value={comment} onChange={(e) => {
                                setComment(e.target.value)
                            }} />


                            <button onClick={() => {
                                addNewComment()
                            }} >add comment</button>
                        </div>
                        {renderComment()}
                    </div>
                </div>

        })
    }
    return (
        <>
            {renderBlogs()}
        </>
    )
}
