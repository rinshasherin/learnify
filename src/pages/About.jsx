import React from 'react'
import './bg.css'
import { Row, Col } from 'react-bootstrap'
import why from './files/why.png'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'


function About() {
    return (
        <>
            <div className='bg'>
                <Header />

                <div className='container d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
                    <div className='row pt-5'>

                        <div className='col-6 d-flex flex-column justify-content-center'>
                            <h2 className='my-3 fw-bold'>Welcome to <span style={{ color: '#ff4747' }}>LEARNIFY</span></h2>
                            <p style={{ textAlign: 'justify' }}>
                                Learnify offers expertly crafted courses, personalized learning experiences, and state-of-the-art technology to make education engaging and flexible. With a diverse course library, real-time progress tracking, and 24/7 accessibility, we empower learners to achieve their goals at their own pace. <br /> <br /> Learnify : where knowledge meets growth!
                            </p>
                        </div>
                        <div className='col-6 d-flex justify-content-center'>
                            <img src="https://letsreachsuccess.com/wp-content/uploads/2024/09/best-online-learning-programs-laptop-woman-notebook-desk-writing.jpg" className='img-fluid' alt="" />
                        </div>
                    </div>
                </div>

                <div className="container w-75 border shadow p-4 pb-5 mt-5 mb-5 rounded">
                    <h2 className='text-center mb-3' style={{ fontWeight: 'bold', letterSpacing: '2px', }}>WHY US<span className='text-danger'>?</span></h2>
                    <Row>
                        <Col sm={6}>
                            <img src={why} alt="" className="img-fluid" style={{ height: '400px', width: '500px' }} />
                        </Col>
                        <Col sm={6} className='d-flex flex-column justify-content-center'>
                            <ul>
                                <li>Learnify is an online learning platform with an easy-to-use interface and interactive features.</li>
                                <li>It offers many courses in different categories for learners of all interests.</li>
                                <li>Users can start learning for free and choose to subscribe for advanced lessons.</li>
                                <li>Learnify allows flexible learning, so users can learn at their own pace.</li>
                            </ul>
                            <div className='ms-3 mt-4'>
                                <Link to={'/'} className='btn abt' >Know More About Us</Link>
                            </div>

                        </Col>
                    </Row>
                </div>


                <Footer />
            </div>
        </>
    )
}

export default About