import React, { useContext, useState } from 'react'
import './auth.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginApi, registerApi } from '../../services/allApi'
// import { responseContext } from '../../ContextApi/ContextProvider'
import { logContext } from '../../contextapi/AuthContext'


function Auth() {

  const [authStatus, setAuthStatus] = useState(false)
  const [user, setUser] = useState({
    email: "", username: "", password: ""
  })

  const {setLogStatus}=useContext(logContext)

  // const { setResponse } = useContext(responseContext)

  const nav = useNavigate()

  const changeAuthStatus = () => {
    setAuthStatus(!authStatus)
  }

  const handleRegister = async () => {
    console.log(user)
    const { email, username, password } = user
    if (!email || !username || !password) {
      toast.warning("Enter Valid Inputs")
    }
    else {
      const res = await registerApi(user)
      // console.log(res)
      if (res.status == 201) {
        toast.success("Registration Successfull")
        setUser({
          email: "", username: "", password: ""
        })
        // setResponse(res)
        changeAuthStatus()

      }
      else {
        if (res?.response?.data) {
          toast.error(res.response.data)
        }
        else {
          toast.error('Something Went Wrong')
        }
      }
    }

  }

  const handleLogin = async () => {
    const { email, password } = user
    if (!email || !password) {
      toast.warning("Enter Valid Inputs")
    }
    else {
      const res = await loginApi(user)
      // console.log(res)
      if (res.status == 200) {
        toast.success("Login Successfull!!")
        setUser({
          email: "", username: "", password: "",
        })
        // setResponse(res)
        console.log(res.data)
        sessionStorage.setItem('token', res.data.token)
        sessionStorage.setItem('username', res.data.username)
        sessionStorage.setItem('profile', res.data.profile)
        sessionStorage.setItem('user', JSON.stringify(res.data.user))
        if (res.data.user.role == "user") {
          setLogStatus(true)
          nav('/')

        }
        else {
          nav('/admin-db')
        }
      }
    }
  }

  return (
    <>

      <div className="bg d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="container">
          <div className='form rounded px-4 py-4 shadow d-flex flex-column justify-content-center'>
            <h4 className='log-h mb-3 text-center' style={{ fontSize: '35px', fontWeight: 'bold', letterSpacing: '3px' }}>
              {
                authStatus ?
                  <>SIGNUP</>
                  :
                  <>SIGNIN</>
              }
            </h4>

            <div>
              <input type="email" value={user.email} name="" id="" className="form-control mb-3" placeholder='Enter email' onChange={(e) => setUser({ ...user, email: e.target.value })} />
              {
                authStatus &&
                <input type="text" value={user.username} name="" id="" className="form-control mb-3" placeholder='Enter username' onChange={(e) => setUser({ ...user, username: e.target.value })} />
              }
              <input type="password" value={user.password} name="" id="" className="form-control mb-3" placeholder='Enter password' onChange={(e) => setUser({ ...user, password: e.target.value })} />

            </div>

            <div className="d-flex justify-content-between mb-3">
              {
                authStatus ?
                  <button className="btn sign" onClick={handleRegister}>SignUp</button>

                  :
                  <button className="btn sign" onClick={handleLogin}>SignIn</button>
              }
              {
                authStatus ?
                  <button className="btn btn-link" onClick={changeAuthStatus}>Already Here?</button>
                  :
                  <button className="btn btn-link" onClick={changeAuthStatus}>New Here?</button>
              }
            </div>
            <div className='d-flex justify-content-center'>
              <a className='forgot' href="#">
                {
                  authStatus ?
                    <></>
                    :
                    <>
                      <a href="" className='text-decoration-none'>Forgot your password?</a>
                    </>
                }
              </a>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Auth