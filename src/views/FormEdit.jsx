import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getBookById } from '../store/actions'
import useHookBook from '../hooks/useHookBook'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function FormEdit() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const book = useSelector((state) => state.bookList.book)
    const loading = useSelector((state) => state.bookList.loading)
    const error = useSelector((state) => state.bookList.error)
    const { editBook } = useHookBook()
    const [data, setData] = useState({
        title: '',
        author: '',
        price: ''
    })

    const notify = (string) => toast(string)

    useEffect(() => {
        if (id) {
            dispatch(getBookById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (book) {
            setData({
                title: book.title || '',
                author: book.author || '',
                price: book.price || ''
            });
        }
    }, [book]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const string = await editBook(id, data)
            console.log(string, 'cek isi balikan string');
            notify(string)
            setTimeout(() => {
               navigate('/dashboard')
            }, 2000);
            
        } catch (error) {
            notify(error)
            console.log(error, 'cek eror page');
            setTimeout(() => {
                navigate('/dashboard')
             }, 2000);
        }
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Something Went Wrong...</h1>
    }
    return (
        <form onSubmit={handleSubmit} className='m-5' style={{ maxWidth: '25vw' }}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Title</label>
                <input name='title' value={data.title} onChange={handleInputChange} type="text" class="form-control" id="exampleInputEmail1" required />
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Author</label>
                <input name='author' value={data.author} onChange={handleInputChange} type="text" class="form-control" id="exampleInputEmail1" required />
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Price</label>
                <input name='price' value={data.price} onChange={handleInputChange} type="number" class="form-control" id="exampleInputEmail1" required />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
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
        </form>
    )
}
