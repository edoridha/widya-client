import { TablePagination } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Pagination(props) {
    const navigate = useNavigate()
    const { currentPage, totalItem} = props

    const queryParams = new URLSearchParams(location.search)
    const limit = queryParams.get("limit") || "10"

    const [page, setPage] = React.useState(Number(currentPage));
    const [rowsPerPage, setRowsPerPage] = React.useState(Number(limit))

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
        navigate(`/dashboard?page=${newPage}&limit=${rowsPerPage}`)
    }

    const handleChangeRows = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
        navigate(`/dashboard?page=${page}&limit=${event.target.value}`)
    }
  return (
    <TablePagination
    component="div"
    count={totalItem}
    page={page}
    onPageChange={handleChangePage}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={handleChangeRows}
    />
  )
}
