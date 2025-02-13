import React, { useContext, useEffect, useState } from 'react'
import './bg.css'
import base_url from '../services/base_url'
import { updateProfileApi } from '../services/allApi'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { logContext } from '../contextApi/AuthContext'


function Profile() {


    const [details, setDetails] = useState({                           // state for viewing username when open profile upadation
        username: "", profile: ""
    })

    const [preview, setPreview] = useState("")

    const nav = useNavigate()

    const {setLogStatus}=useContext(logContext)


    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setDetails({
                username: sessionStorage.getItem('username'),
                profile: sessionStorage.getItem('profile')
            })
        }
    }, [])

    useEffect(() => {
        if (details.profile.type) {
            setPreview(URL.createObjectURL(details.profile))
        }
        else {
            setPreview("")
        }
    }, [details.profile])


    const handleUpdate = async () => {
        console.log(details)
        const { username, profile } = details
        if (!username || !profile) {
            toast.warning("Enter all inputs!!")
        }
        else {
            if (profile.type) {
                const fd = new FormData()
                fd.append('username', username)
                fd.append('profile', profile)

                const header = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }

                const result = await updateProfileApi(header, fd)
                if (result.status == 200) {
                    toast.success("Profile updation successfull!!")
                    nav('/auth')
                    setLogStatus(false)
                    sessionStorage.clear()
                }
                else {
                    toast.error("Updation failed!!")
                }
            }
            else {
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }

                const result = await updateProfileApi(header, details)
                if (result.status == 200) {
                    toast.success("Profile updation successfull!!")
                    nav('/auth')
                    setLogStatus(false)
                    sessionStorage.clear()
                }
                else {
                    toast.error("Updation failed!!")
                }
            }
        }
    }

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center bg" style={{ height: '100vh' }}>
                <div className="p-5 border border-2 shadow shadow-lg ">
                    <h4 className='mb-4' style={{ color: '#ff4747' }}>PROFILE UPDATION</h4>
                    <label>
                        <input type="file" name="" id="" className="form-control" style={{ display: 'none' }} onChange={(e) => setDetails({ ...details, profile: e.target.files[0] })} />
                        <img src={preview ? preview : details.profile !== '' ? `${base_url}/uploads/${details.profile}` : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png"} alt="" style={{ width: '40%' }} className="img-fluid mb-4" />
                    </label>
                    <input type="text" defaultValue={details.username} name="" id="" placeholder='Name' className="form-control" onChange={(e) => setDetails({ ...details, username: e.target.value })} />
                    <div className="d-flex justify-content-end mt-3">
                        <Link to={'/'} className="btn btn-secondary me-2" >Cancel</Link>
                        <button className="btn btn-primary" onClick={handleUpdate} >Update</button>
                    </div>
                </div>
            </div>

        </>
    )
}


export default Profile