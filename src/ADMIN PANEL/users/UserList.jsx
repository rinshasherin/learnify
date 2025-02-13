import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../home/Sidebar'
import { getAllUsersApi } from '../../services/allApi'
import { responseContext } from '../../ContextApi/ContextProvider'

function UserList() {

    const [users, setUsers] = useState([])

    const { response } = useContext(responseContext)

    const [isOpen, setIsOpen] = useState(true)

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        getUsers()
    }, [response])


    const getUsers = async () => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getAllUsersApi(header)
        // console.log(res)
        if (res.status == 200) {
            setUsers(res.data)
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
                            Users</h1>
                        {
                            users.length > 0 ?
                                <table className='table table-bordered'>
                                    <thead className='table-info'>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map((item, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.username}</td>
                                                    <td>{item?.email}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                :
                                <h4 className="text-center text-danger">No Users</h4>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserList