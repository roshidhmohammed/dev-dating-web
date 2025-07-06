import { createSlice } from "@reduxjs/toolkit";
import type {RequestsType} from "../../types"
const initialState:RequestsType[] | null =null

const requestSlice = createSlice({
    name:"requests", 
    initialState,
    reducers:{
        addRequests:(_state, action) => action.payload,
        removeRequests:() => null
    }
})

export const {addRequests, removeRequests} = requestSlice.actions

export default requestSlice.reducer