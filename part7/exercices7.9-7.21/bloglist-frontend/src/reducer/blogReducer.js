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
            state.blogs.push(action.payload)
        },
    }
})

export const { setAllBlog, setNewBlog } = blogSlicer.actions
export default blogSlicer.reducer
