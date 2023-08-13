import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null
}
const userSlicer = createSlice({
    name: "user",
    initialState,
    reducers: ({
        addUser(state, action) {
            state.user = action.payload
        },
        removeUser(state) {
            state.user = null
        },
    })
})


export const { addUser, removeUser } = userSlicer.actions
export default userSlicer.reducer