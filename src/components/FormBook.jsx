import React, { useState } from 'react';
import useHookBook from '../hooks/useHookBook';
import { useDispatch } from 'react-redux';
import { fetchBookList } from '../store/actions';
import 'react-toastify/dist/ReactToastify.css';

export default function FormBook() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: ''
    });
    const { createBook } = useHookBook();
    const dispatch = useDispatch();

    const notify = (message) => toast(message);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBook(formData);
            setFormData({
                title: '',
                author: '',
                price: ''
            });
            dispatch(fetchBookList({ page: 0, limit: 10 }));
        } catch (error) {
            notify('Failed');
        }
    };

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Create Book</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input name="title" type="text" className="form-control" value={formData.title} onChange={handleInputChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="author" className="form-label">Author</label>
                                <input name="author" value={formData.author} onChange={handleInputChange} type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input name="price" type="number" value={formData.price} onChange={handleInputChange} className="form-control" required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
