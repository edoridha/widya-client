import React, { useState } from 'react';
import useHookUser from '../hooks/useHookUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChangePassword() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: ''
    });

    const { userPassword } = useHookUser()
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
            await userPassword(formData)
            notify('Password Change Success')
            setFormData({
                currentPassword: '',
                newPassword: ''
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
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="inputPassword1" className="form-label">Current Password</label>
                                <div className="input-group">
                                    <input type={showPassword ? "text" : "password"} className="form-control" id="inputPassword1" name='currentPassword' value={formData.currentPassword} onChange={handleInputChange} />
                                    <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword2" className="form-label">New Password</label>
                                <div className="input-group">
                                    <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword2" name='newPassword' value={formData.newPassword} onChange={handleInputChange} />
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
