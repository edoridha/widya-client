import { createSlice } from "@reduxjs/toolkit";
import { fetchBookList, getBookById } from "../actions";

const bookSlice = createSlice({
    name: "bookList",
    initialState: {
        list: [],
        currentPage: 0,
        totalItem: 0,
        loading: true,
        error: null,
        book: null
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
        .addCase(fetchBookList.pending, (state, action) => {
            state.loading = true
        })
        .addCase(fetchBookList.fulfilled, (state, action) => {
            state.list = action.payload.books
            state.currentPage = action.payload.pagination.currentPage
            state.totalItem = action.payload.pagination.totalItem
            state.loading = false
            state.error = null
        })
        .addCase(fetchBookList.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        .addCase(getBookById.pending, (state, action) => {
            state.loading = true
        })
        .addCase(getBookById.fulfilled, (state, action) => {
            state.book = action.payload
            state.loading = false
            state.error = null 
        })
        .addCase(getBookById.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const {setError, setLoading} = bookSlice.actions
export default bookSlice.reducer