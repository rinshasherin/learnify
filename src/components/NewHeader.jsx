import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function NewHeader() {
    return (
        <>

            <Navbar expand="lg" className="">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="link p-3 mx-auto">
                            <Nav.Link href="/" className='me-3'>HOME</Nav.Link>
                            <Nav.Link href="/allcat" className='me-3'>CATEGORIES</Nav.Link>
                            <Nav.Link href="/allcourses" className='me-3'>COURSES</Nav.Link>
                            <Nav.Link href="/about" className='me-3'>ABOUT US</Nav.Link>
                            <Nav.Link href="/contact" className='me-3'>CONNECT</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default NewHeader