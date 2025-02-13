import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../home/Sidebar'
import { getAllReviewsApi, updateReviewApi } from '../../services/allApi'
import { responseContext } from '../../contextapi/ContextProvider'

function Reviews() {

    const [allReviews, setAllReviews] = useState([])
    const [isOpen, setIsOpen] = useState(true)

    const { response } = useContext(responseContext)

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        getAllReviews()
    }, [response])

    const getAllReviews = async () => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getAllReviewsApi(header)
        // console.log(res.data)
        if (res.status == 200) {
            setAllReviews(res.data)
        }
    }

    const updateStatus = async (id, status) => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await updateReviewApi(id, header, status)
        console.log(res)
        if (res.status == 200) {
            getAllReviews()
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {
                        isOpen ?
                            <Sidebar />
                            :
                            <></>
                    }
                    <div className='col p-3 container'>
                        <h1 className='text-secondary mb-3'>
                            <button className="btn me-1" onClick={toggleSidebar}>
                                <i class="fa-solid fa-bars fa-lg text-dark" />
                            </button>
                            Reviews
                        </h1>
                        {
                            allReviews.length > 0 ?
                                <table className='table table-bordered'>
                                    <thead className='table-info'>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Message</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allReviews.map((item, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.message}</td>
                                                    <td>
                                                        {item.status == 'pending' ? (
                                                            <>
                                                                <button className="btn btn-success me-2" onClick={() => updateStatus(item._id, 'approved')}>
                                                                    <i className="fa-solid fa-check" />
                                                                </button>
                                                                <button className="btn btn-danger">
                                                                    <i className="fa-solid fa-xmark" onClick={() => updateStatus(item._id, 'rejected')} />
                                                                </button>
                                                            </>
                                                        )
                                                            :
                                                            <>
                                                                {item.status == 'approved' ? (
                                                                    <>
                                                                        <h6 className="text-success">Approved</h6>
                                                                    </>
                                                                )
                                                                    :
                                                                    <>
                                                                        {item.status == 'reject'}
                                                                        <h6 className="text-danger">Rejected</h6>
                                                                    </>
                                                                }
                                                            </>
                                                        }

                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                                :
                                <h4 className="text-center text-danger">No Reviews</h4>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Reviews