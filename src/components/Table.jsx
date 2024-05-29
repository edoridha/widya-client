import { Button, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import Table from '@mui/material/Table';
import Pagination from './Pagination';
import useHookBook from '../hooks/useHookBook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { fetchBookList } from '../store/actions';
import { useNavigate } from 'react-router-dom';

export default function TableComponent(props) {
    const navigate = useNavigate()
    const { deleteBook } = useHookBook()
    const dispatch = useDispatch()
    const { books, currentPage, totalItem } = props
    const notify = (string) => toast(string)

    const handleDelete = async (id) => {
        try {
            const string = await deleteBook(id)
             console.log('cek isi dari string', string);
             notify(string)
             setTimeout(() => {
                dispatch(fetchBookList({ page: 0, limit: 10 }));
            }, 2000);
        } catch (error) {
            notify(error)
            console.log(error);
        }
    }

    const handleEdit = (id) => {
        navigate(`/edit-book/${id}`)
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        books.map((d, k) => {
                            return <TableRow key={k}>
                                <TableCell>{d.title}</TableCell>
                                <TableCell>{d.author}</TableCell>
                                <TableCell>{d.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDelete(d.id)}>Delete</Button>
                                    <ToastContainer
                                        position="top-center"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        theme="dark"
                                    />
                                    <Button onClick={()=> handleEdit(d.id)} >Edit</Button>
                                   
                                </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
            <Pagination totalItem={totalItem} currentPage={currentPage} />
        </TableContainer>
    )
}
