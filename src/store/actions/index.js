import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const api_url = 'http://localhost:4001'

export const fetchBookList = createAsyncThunk(
    "bookList/fetchBookList", 
    async (pagination) => {
        try {
            const {page, limit} = pagination
            const {data} = await axios({
                url: `${api_url}/book?page=${page}&limit=${limit}`,
                headers: {access_token: localStorage.getItem('access_token')}
            })
            return{ books: data.books, pagination: data.pagination}
        } catch (error) {
            throw error
        }
    }
)

export const getBookById = createAsyncThunk(
    "book/bookId",
    async (id) => {
        try {
            const {data} = await axios({
                url: `${api_url}/book/${id}`,
                headers: {access_token: localStorage.getItem('access_token')}
            })
          return data.book  
        } catch (error) {
            throw error
        }
    }
)

export const getUser = createAsyncThunk(
    "user/userId",
    async () => {
        try {
            const {data} = await axios({
                url: `${api_url}/profile`,
                headers: {access_token: localStorage.getItem('access_token')}
            })
            return data.user
        } catch (error) {
           throw error 
        }
    }
)