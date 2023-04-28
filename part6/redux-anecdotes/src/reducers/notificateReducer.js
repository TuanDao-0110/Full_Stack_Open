import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    show: false,
    content: '',
}


const notificateSlicer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        openNotification(state, action) {
            return { ...state, show: true, content: action.payload }
        },
        closeNotification(state, action) {
            return { ...state, show: false }
        }
    }
})

export const {closeNotification,openNotification} = notificateSlicer.actions
export default notificateSlicer.reducer