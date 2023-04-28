import React from 'react'
import { useDispatch } from 'react-redux'
import { setNewAnecodeotes } from '../reducers/anecdoteReducer'
import { closeNotification, openNotification } from '../reducers/notificateReducer'
import apiService from '../services/notes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdotes = async (event) => {
        event.preventDefault()
        const content = event.target.anecdotes.value
        event.target.anecdotes.value = ''
        const newAs = await apiService.createNew(content)
        dispatch(setNewAnecodeotes(newAs))
        dispatch(openNotification('New anecdotes add: ' + `"${content}"`))
        setTimeout(() => {
            dispatch(closeNotification())
        }, 5000)
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