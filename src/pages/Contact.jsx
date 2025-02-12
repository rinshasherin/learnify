import React, { useContext, useState } from 'react'
import './bg.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { toast } from 'react-toastify'
import { addReviewApi } from '../services/allApi'
import { responseContext } from '../ContextApi/ContextProvider'
import { useNavigate } from 'react-router-dom'

function Contact() {

  const [review, setReview] = useState({
    name: "", email: "", message: ""
  })

  const { setResponse } = useContext(responseContext)

  const nav = useNavigate()

  const handleAdd = async () => {
    // console.log(review)
    const { name, email, message } = review
    if (!name || !email || !message) {
      toast.warning("Enter all inputs!!")
    }
    else {
      const result = await addReviewApi(review)
      console.log(result)
      if (result.status == 200) {

        toast.success("Successfully added")
        nav('/')
        setReview(result)

        setResponse(result)

      }

    }
  }

  return (
    <>
      <div className="bg ">
        <Header />
        <div className="row align-items-center pt-5 " >
          <div className="col-lg-2"></div>
          <div className="col-lg-8 text-center ">
            <h1 className='fw-bold'>Contact Us</h1>
            <p className="mt-5">We’re here to help! If you have any questions, feedback, or need support, feel free to reach out to us. Whether it’s about courses, subscriptions, or technical issues, our team is ready to assist you. Connect with us through email, social media, or our support page for quick assistance. Let’s make learning better together!</p>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <div className='border-bottom border-secondary container my-5'></div>

        <div className='row align-items-center my-5'>
          <div className='col-lg-2'></div>
          <div className='col-lg-4'>
            <div className="border-bottom">
              <h3>Get In Touch</h3>
              <p style={{ textAlign: 'justify' }}>We’d love to hear from you! Whether you have questions about our courses, need technical support, or want to share feedback, we’re here to help. At Learnify, we value our learners and strive to provide the best learning experience possible. <br />
                If you need assistance with subscriptions, course content, or any other inquiries, our team is ready to support you. Reach out to us via email, phone, or social media, and we’ll get back to you as soon as possible. Let’s make learning more accessible and engaging together!</p>
              <div className="my-4">
                <span className="p-2 text-light rounded-circle me-1" style={{ backgroundColor: '#ff4747' }}>
                  <i className="fa-solid fa-location-crosshairs" />
                </span>
                Address :
                123 Learning Street, EduCity, 456789
              </div>
              <div className="my-4">
                <span className="p-2 text-light rounded-circle me-1" style={{ backgroundColor: '#ff4747' }}>
                  <i className="fa-solid fa-phone" />
                </span>
                Phone :
                +91 90XXXXXXXX
              </div>
              <div className="my-4">
                <span className="p-2 text-light rounded-circle me-1" style={{ backgroundColor: '#ff4747' }}>
                  <i className="fa-solid fa-envelope" />
                </span>
                Email ID : support@learnify.com
              </div>
            </div>
            <div className="d-flex justify-content-evenly my-3">
              <span className="p-3 rounded-circle border text-light" style={{ backgroundColor: '#ff4747' }}>
                <i className="fa-brands fa-facebook-f" />
              </span>
              <span className="p-3 rounded-circle border text-light" style={{ backgroundColor: '#ff4747' }}>
                <i className="fa-brands fa-instagram" />
              </span>
              <span className="p-3 rounded-circle border text-light" style={{ backgroundColor: '#ff4747' }}>
                <i className="fa-brands fa-x-twitter" />
              </span>
              <span className="p-3 rounded-circle border text-light" style={{ backgroundColor: '#ff4747' }}>
                <i className="fa-brands fa-youtube" />
              </span>
            </div>
          </div>

          <div className='col-lg-4'>
            <div className='rounded border shadow p-5'>
              <h3>Student Voices</h3>
              <div className='mb-3 mt-4'>
                <input type="text" name="" placeholder='Name' id="" className="form-control mb-3" onChange={(e) => { setReview({ ...review, name: e.target.value }) }} />
                <input type="email" name="" placeholder='Email' id="" className="form-control mb-3" onChange={(e) => { setReview({ ...review, email: e.target.value }) }} />
                <textarea name="" placeholder='Message' id="" className="form-control mb-3" onChange={(e) => { setReview({ ...review, message: e.target.value }) }}></textarea>
                <div>
                  <p>By submitting, You are agreeing with the terms and conditions of the website.</p>
                  <div className='text-end'>
                    <button className="btn btn-secondary" onClick={handleAdd}>Submit</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-2'></div>
        </div>


        <Footer />
      </div>
    </>
  )
}

export default Contact