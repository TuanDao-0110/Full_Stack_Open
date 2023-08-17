import { configureStore } from '@reduxjs/toolkit'
import notificateReducer from './reducer/notificationReducer'
import blogReducer from './reducer/blogReducer'
import userInfor from './reducer/userInfor'
import commentReducer from './reducer/commentReducer'
const store = configureStore({
    reducer: {
        notificateReducer,
        blogReducer,
        userInfor,
        commentReducer
    }
})


export default store