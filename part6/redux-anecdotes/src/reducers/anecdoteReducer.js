import { createSlice } from "@reduxjs/toolkit"
import apiService from '../services/notes'

const initialState = []

const anecdoteSlicer = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAs(state, action) {
      return action.payload
    },
    setNewAnecodeotes(state, action) {
      let temp = [...state]
      temp.push(action.payload)
      return [...temp]
    },
    newVote(state, action) {
      let index = state.findIndex(e => e.id === action.payload)
      state[index].votes++
      return state
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    }
  }
})

export const initializeAs = () => {
  return async dispatch => {
    const newAs = await apiService.getAll()
    dispatch(setAs(newAs))
  }
}

export const createNewAs = (content) => {
  return async dispatch => {
    const newAs = await apiService.createNew(content)
    dispatch(setNewAnecodeotes(newAs))
  }
}
export const { setNewAnecodeotes, newVote, appendAnecdotes, setAs } = anecdoteSlicer.actions
export default anecdoteSlicer.reducer