import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className='border-bottom border-secondary my-5'></div>
      <div className="container pb-5">
        <Row>
          <Col>
            <h4 className='fw-bold'>
              <i className="fa-solid fa-graduation-cap me-1" style={{ color: '#ff4747', }} />
              LEARNIFY
            </h4>
            <p style={{ textAlign: 'justify' }}>
              Explore a wide range of courses with interactive learning experiences. Access free content and expand your knowledge anytime, anywhere. Keep learning with Learnify!
            </p>
          </Col>
          <Col>
            <h5>Quick Links</h5>
            <div className="d-flex flex-column justify-content-around">
              <Link to={'/'} className='text-secondary' style={{ textDecoration: 'none' }}>Home</Link>
              <Link to={'/auth'} className='text-secondary' style={{ textDecoration: 'none' }}>Login</Link>
              <Link to={'/allcourses'} className='text-secondary' style={{ textDecoration: 'none' }}>Courses</Link>
              <Link to={'/allcat'} className='text-secondary' style={{ textDecoration: 'none' }}>Categories</Link>
            </div>
          </Col>
          <Col>
            <h5>Feedback</h5>
            <textarea name="" id="" className="form-control my-3"></textarea>
            <button className="btn btn-info">Send</button>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Footer