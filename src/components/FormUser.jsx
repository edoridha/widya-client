import React, { useState } from 'react';
import useHookUser from '../hooks/useHookUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormUser() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        password: ''
    });

    const { createUser } = useHookUser()
    const [showPassword, setShowPassword] = useState(false);
    const notify = (string) => toast(string)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await createUser(formData)
            notify('User created')
            setFormData({
                name: '',
                email: '',
                gender: '',
                password: ''
            })
        } catch (error) {
            console.log(error);
            notify('Failed')
        }
    };

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">SIGN UP</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                                <input name="name" value={formData.name} onChange={handleInputChange} type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                                <input placeholder="name@example.com" name="email" value={formData.email} onChange={handleInputChange} type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Gender</label>
                                <select value={formData.gender} className="form-select" name='gender' onChange={handleInputChange} aria-label="Default select example">
                                    <option value="" disabled>Select your gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                                <div className="input-group">
                                    <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword" name='password' value={formData.password} onChange={handleInputChange} />
                                    <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" >Submit</button>
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
