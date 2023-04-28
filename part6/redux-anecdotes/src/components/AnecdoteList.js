import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { closeNotification, openNotification } from '../reducers/notificateReducer'

function AnecdoteList() {
    const anecdotes = useSelector(state => state.anecdote)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const vote = (id, content) => {
        dispatch(newVote(id))
        dispatch(openNotification('You Voted: '  + `"${content}"`))
        setTimeout(() => {
            dispatch(closeNotification())
        }, 5000)
    }
    return (
        <div>
            {anecdotes.filter(e => e.content.toUpperCase().includes(filter.toUpperCase())).sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList