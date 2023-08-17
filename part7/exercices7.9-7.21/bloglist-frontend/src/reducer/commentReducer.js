import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    listComments: []
}
const commentSlicer = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        getAllComment(state, action) {
            state.listComments = action.payload
        },
        updateComment(state, action) {
            state.listComments.push(action.payload)
        }

    }
})

export const { getAllComment, updateComment } = commentSlicer.actions

export default commentSlicer.reducer


