import React from 'react'
import { useDispatch } from 'react-redux'
import { createFilter } from '../reducers/filterReducer'

function Filter() {
    const dispatch = useDispatch()
    const startFilter = (e) => {
        const content = e.target.value
        dispatch(createFilter(content))
    }

    const style = {
        marginBottom: 10
    }
    return (
        <form style={style} >
            <input name='filter' onChange={startFilter} />
        </form>
    )
}

export default Filter