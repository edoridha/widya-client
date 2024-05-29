import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormUser from '../components/FormUser';
import useHookUser from '../hooks/useHookUser';

export default function Login() {
  const navigate = useNavigate()
  const { loginForm } = useHookUser()

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const notify = (string) => toast(string)
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await loginForm(form)
      notify('Login Success')
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000)
    } catch (error) {
      notify('Login Failed')
    }
  }

  return (
    <div className='p-5' style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <form style={{ margin: 'auto', width: 'fit-content' }} onSubmit={handleLogin} >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="name@example.com" name='email' value={form.email} onChange={handleForm} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <div className="input-group">
            <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1" name='password' value={form.password} onChange={handleForm} />
            <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
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
      <div>
        <p className="form-text" style={{ margin: 'auto', width: 'fit-content' }}>don't have account? <a data-bs-toggle="modal" data-bs-target="#exampleModal">sign up</a></p>
        <FormUser />
      </div>
    </div>
  );
}
