import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote, initializeAs, newVote } from '../reducers/anecdoteReducer'
function AnecdoteList() {
    const anecdotes = useSelector(state => state.anecdote)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const vote = (id) => {
        dispatch(addVote(id))
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList