import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    type: null,
    content: ''
}
const notificationSlicer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        openNote(state, action) {
            state.content = action.payload.content
            state.type = action.payload.type
        },
        closeNote(state) {
            state.type = null
            state.content = ''
        }
    }
})

export const { closeNote, openNote } = notificationSlicer.actions
export default notificationSlicer.reducer