import { configureStore } from '@reduxjs/toolkit'
import notificateReducer from './reducer/notificationReducer'
import blogReducer from './reducer/blogReducer'
import userInfor from './reducer/userInfor'
const store = configureStore({
    reducer: {
        notificateReducer,
        blogReducer,
        userInfor
    }
})


export default store