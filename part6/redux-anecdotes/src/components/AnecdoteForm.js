import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdotes = (event) => {
        event.preventDefault()
        const content = event.target.anecdotes.value
        event.target.anecdotes.value = ''
        dispatch(createNewAnecdotes(content))
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={newAnecdotes}>
                <input name='anecdotes' />
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm