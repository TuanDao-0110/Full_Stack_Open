import { createSlice } from "@reduxjs/toolkit"

const initialState = ''
const filterSlicer = createSlice({
    name:'filter',
    initialState,
    reducers:{
        setFilter (state,action){
           return state = action.payload     
        }
    }
})

export const {setFilter} = filterSlicer.actions

export default filterSlicer.reducer