import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ADD_NEW_BOOK } from '../query'

export default function AddBook() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState(38)
    const [genres, setGenres] = useState('')
    const [errMsg, setErrMsg] = useState(null)
    const [addNewBook] = useMutation(ADD_NEW_BOOK, {
        // refetchQueries: [{query:GET_ALL_BOOKS}]
        onError: (err) => {
            const msg = err.graphQLErrors[0].message
            setErrMsg(msg)
        },
    })

    const notify = () => {
        setTimeout(() => {
            setErrMsg(null)
        }, 5000);
        return <div style={{ color: 'red' }}>{errMsg}</div>
    }
    const submit = () => {
        addNewBook({ variables: { title, author, published, genres } })
        setTitle("")
        setAuthor('')
        setPublished("")
        setGenres('')
    }
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
                published: <input type={'number'}  value={published} onChange={(e) => { setPublished(Number(e.target.value)) }} />
            </div>
            <button style={{ width: 'fit-content', }}
                onClick={submit}
            >create</button>
        </div>
    )
}
