import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ADD_NEW_BOOK, GET_ALL_BOOKS } from '../query'
import { useNavigate } from 'react-router-dom'
export default function AddBook({ token,books }) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState(0)
    const [genres, setGenres] = useState('')
    const [errMsg, setErrMsg] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);
    const [addNewBook] = useMutation(ADD_NEW_BOOK, {
        onError: err => {
            const msg = err.graphQLErrors[0].message
            setErrMsg(msg)
        },
        refetchQueries: [
            books.refetch()
        ],
        onCompleted : (data)=> {
            setErrMsg('success add new book')
        }
    })

    const notify = () => {
        setTimeout(() => {
            setErrMsg(null)
        }, 5000);
        return <div style={{ color: 'red' }}>{errMsg}</div>
    }
    const submit =  () => {
        addNewBook({ variables: { title, author, published, genres } })
        setTitle("")
        setAuthor('')
        setPublished("")
        setGenres('')
    }

    return <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {errMsg !== null && notify()}
        <h1>Add book</h1>
        <div>
            title: <input value={title} onChange={(e) => { setTitle(e.target.value) }} />
        </div>
        <div>

            author: <input value={author} onChange={(e) => { setAuthor(e.target.value) }} />
        </div>
        <div>

            genres: <input value={genres} onChange={(e) => { setGenres(e.target.value) }} />
        </div>
        <div>
            published: <input type={'number'} value={published} onChange={(e) => { setPublished(Number(e.target.value)) }} />
        </div>
        <button style={{ width: 'fit-content', }}
            onClick={submit}
        >create</button>
    </div>

}
