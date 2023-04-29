import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificateReducer from './reducers/notificateReducer'

const store = configureStore({
    reducer: {
        anecdote: anecdoteReducer,
        filter: filterReducer,
        notification: notificateReducer
    }
})

export default store