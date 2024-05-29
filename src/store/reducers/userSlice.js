import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../actions";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: '',
        loading: true,
        error: null 
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
            state.loading = false 
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUser.pending, (state, action) => {
            state.loading = true
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
            state.error = null
        })
        .addCase(getUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const {setError, setLoading} = userSlice.actions

export default userSlice.reducer