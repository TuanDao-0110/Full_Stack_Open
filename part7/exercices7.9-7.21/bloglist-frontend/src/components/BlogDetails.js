import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { setNewBlog } from '../reducer/blogReducer';
import blogService from '../services/blogs';
import { getAllComment } from '../reducer/commentReducer';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


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
            return <ListGroup.Item as="li" key={index}>{item}</ListGroup.Item>
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
                return <Card style={{ width: '50rem' }} key={index} >
                    <Card.Body>
                        <Card.Header>
                            <Card.Title>

                                <span >{item.title}</span> by author:{item.author}
                            </Card.Title>
                        </Card.Header>

                        <div className="blog" >
                            <div>
                                {/* <h3>Blog details</h3> */}
                            </div>
                            <div >

                            </div>
                            <Table>

                                <p>author: {item.author}</p>
                                <p>
                                    likes: {item.likes} <Button variant='success' onClick={addLike}>like 👍</Button>
                                </p>
                                <p>
                                    url 👉: <a href={item.url}>
                                        {item.url}
                                    </a>
                                </p>
                                <p>
                                    add by <span style={{ fontWeight: '800', fontSize: '1.5rem' }}>

                                        {item.user.name}
                                    </span>
                                </p>
                            </Table>
                            <div>
                                <h2>Comments</h2>
                                <InputGroup>

                                    <Form.Control width={'md'} aria-label="input your new comment" value={comment} onChange={(e) => {
                                        setComment(e.target.value)
                                    }} />

                                    <Button onClick={() => {
                                        addNewComment()
                                    }} >add comment</Button>
                                </InputGroup>
                                <ListGroup as="ol" style={{ paddingTop: '2rem' }}>

                                    {renderComment()}
                                </ListGroup>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
        })
    }
    return (
        <div className='' style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            {renderBlogs()}
        </div>
    )
}
