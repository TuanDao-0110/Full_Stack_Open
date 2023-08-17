import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    blogs: []
}
const blogSlicer = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setAllBlog(state, action) {
            state.blogs = action.payload
        },
        setNewBlog(state, action) {
            let index = state.blogs.findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state.blogs[index].likes += 1
            } else {
                state.blogs.push(action.payload)
            }
        },
    }
})

export const { setAllBlog, setNewBlog } = blogSlicer.actions
export default blogSlicer.reducer
