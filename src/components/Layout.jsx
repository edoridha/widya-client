import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div style={{ minHeight: '100vh', minWidth: '100vw' }}>
            <Header />
            <section class="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="dashboard-section">
                <Sidebar />
                <Outlet/>
            </section>
        </div>
    )
}
