import React from 'react'

export default function Header() {
    return (
        <header className="navbar sticky-top bg-white flex-md-nowrap p-0 shadow fixed-top" id="navbar">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" >
                <img src="data:image/png;base64,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"
                    width="80" className="d-inline-block me-2" alt="HEADER" />
                Admin Panel</a>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#sidebar-menu" aria-controls="sidebar-menu" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </header >
    )
}
