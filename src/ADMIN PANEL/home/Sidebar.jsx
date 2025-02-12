import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <>
            <div className="col-lg-2 d-flex flex-column p-3 shadow" style={{ minHeight: '100vh', width: 'fit-content', backgroundColor: 'rgb(113, 255, 253)' }}>
                <h4 className="mb-5 text-warning border rounded p-4 shadow">
                    <i className="fa-solid fa-graduation-cap" />
                    Learnify
                </h4>
                <Link to={'/admin-db'} className='text-secondary text-decoration-none fw-bolder mx-4 mb-4'>
                    <i className="fa-solid fa-chart-simple me-1" />
                    Dashboard
                </Link>
                <Link to={'/Courses'} className='text-secondary text-decoration-none fw-bolder mx-4 mb-4'>
                    <i className="fa-solid fa-laptop me-1" />
                    Courses
                </Link>
                <Link to={'/Categories'} className='text-secondary text-decoration-none fw-bolder mx-4 mb-4'>
                    <i className="fa-solid fa-list me-1" />
                    Categories
                </Link>
                <Link to={'/Users'} className='text-secondary text-decoration-none fw-bolder mx-4 mb-4'>
                    <i className="fa-solid fa-users me-1" />
                    Users
                </Link>
                <Link to={'/Reviews'} className='text-secondary text-decoration-none fw-bolder mx-4 mb-4'>
                    <i className="fa-regular fa-message me-1" />
                    Reviews
                </Link>
                <Link to={'/auth'} className='text-danger text-decoration-none fw-bolder mx-4 mb-4'>
                    <i className="fa-solid fa-arrow-right-from-bracket me-1" />
                    Logout
                </Link>
            </div>
        </>
    )
}

export default Sidebar
