import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Layout from "../components/Layout";
import FormEdit from "../views/FormEdit";
import Profile from "../views/Profile";

export default createBrowserRouter(
    [
        {
            element: <Layout/>,
            loader: ()=> {
                const token = localStorage.getItem('access_token')
                if(!token) throw redirect('/')
                    return null
            },
            children: [
                {
                    path: '/dashboard',
                    element: <Home/>
                },
                {
                    path: '/edit-book/:id',
                    element: <FormEdit/>
                },
                {
                    path: '/profile',
                    element: <Profile/>
                }
            ]
        },
        {
            element: <Login/>,
            path: '/',
            loader: () => {
                const token = localStorage.getItem('access_token')
                if(token) throw redirect('/dashboard')
                    return null
            }
        }
    ]
)