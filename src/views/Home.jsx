import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookList } from '../store/actions'
import Table from '../components/Table'
import { useLocation } from 'react-router-dom'
import { Button } from '@mui/material'
import FormBook from '../components/FormBook'

export default function Home() {
  const dispatch = useDispatch()
  const location = useLocation()
  const books = useSelector((state) => state.bookList.list)
  const currentPage = useSelector((state) => state.bookList.currentPage)
  const totalItem = useSelector((state) => state.bookList.totalItem)
  const loading = useSelector((state) => state.bookList.loading)
  const error = useSelector((state) => state.bookList.error)

  const queryParams = new URLSearchParams(location.search)
  const page = queryParams.get("page") || "0"
  const limit = queryParams.get("limit") || "10"

  useEffect(() => {
    dispatch(fetchBookList({ page, limit }))
  }, [page, limit]) 

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Something Went Wrong...</h1>
  }

  return (
    <div className='m-5'>
      <div>
        <Button data-bs-toggle="modal" data-bs-target="#exampleModal">Add Book</Button>
        <FormBook/>
      </div>
      <Table books={books} currentPage={currentPage} totalItem={totalItem} />
    </div>
  )
}
