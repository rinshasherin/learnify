import React, { useContext, useEffect, useState } from 'react'
import './header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { logContext } from '../contextApi/AuthContext';

function Header() {

    const [logStatus, setlogStatus] = useState(false)

    const nav = useNavigate()

    const {setLogStatus}=useContext(logContext)

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setlogStatus(true)
        }
        else {
            setlogStatus(false)
        }
    }, [])


    const logout = () => {
        sessionStorage.clear()
        setLogStatus(false)
        nav('/auth')
    }


    return (
        <>
            <Navbar expand="lg" className="">
                <Container>
                    <i className="fa-solid fa-graduation-cap fa-2xl me-1" style={{ color: '#ff4747', }} />
                    <Navbar.Brand id='learnify' href="#home">LEARNIFY</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="link mx-auto">
                            <Nav.Link href="/" className='me-3'>HOME</Nav.Link>
                            <Nav.Link href="/allcat" className='me-3'>CATEGORIES</Nav.Link>
                            <Nav.Link href="/allcourses" className='me-3'>COURSES</Nav.Link>
                            <Nav.Link href="/about" className='me-3'>ABOUT US</Nav.Link>
                            <Nav.Link href="/contact" className='me-3'>CONNECT</Nav.Link>
                        </Nav>

                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                <i className="fa-regular fa-user fa-lg" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    logStatus ?
                                        <>
                                            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                            <Dropdown.Item className='btn text-danger' onClick={logout}>Logout</Dropdown.Item>
                                        </>
                                        :
                                        <>
                                            <Dropdown.Item href="/auth">SignIn</Dropdown.Item>
                                            <Dropdown.Item href="/auth">SignUp</Dropdown.Item>
                                        </>
                                }

                            </Dropdown.Menu>
                        </Dropdown>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header