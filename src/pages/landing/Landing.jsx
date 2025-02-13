import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './landing.css'
import { allCategoriesApi, allCoursesApi, getReviewsApi } from '../../services/allApi'
import Card from 'react-bootstrap/Card';


function Landing() {

  const [logStatus, setLogStatus] = useState(false)

  const [categories, setCategories] = useState([])
  const [courses, setCourses] = useState([])
  const [reviews, setReviews] = useState([])


  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLogStatus(true)
    }
    else {
      setLogStatus(false)
    }

    getCategories()
    getCourses()
    getReviews()
  }, [])

  const getCategories = async () => {
    const res = await allCategoriesApi()
    // console.log(res)
    if (res.status == 200) {
      setCategories(res.data)
    }
  }

  const getCourses = async () => {
    const res = await allCoursesApi()
    console.log(res.data)
    if (res.status == 200) {
      setCourses(res.data)
    }
  }

  const getReviews = async () => {
    const res = await getReviewsApi()
    // console.log(res)
    if (res.status == 200) {
      setReviews(res.data)
    }
  }

  return (
    <>
      <div className='fullbg'>
        <div className="container-fluid mb-5" style={{ height: '680px' }}>
          <Header />

          <div className="container mt-5">
            <Row>
              <Col sm={6} md={6} className='d-flex flex-column justify-content-center'>

                <h2 className='hh1'>Knowledge at <br /> Your Fingertips</h2>
                <p className='p1'>Learn anytime, anywhere. Explore expert-led courses, sharpen your skills, and achieve your goals with ease.</p>
                {
                  logStatus ?
                    <Link to={'/'} className="btn btn1 " >Begin Your Journey</Link>
                    :
                    <Link to={'/auth'} className="btn btn1 " >Begin Your Journey</Link>
                }

              </Col>
              <Col sm={6} md={6} className='d-flex flex-column justify-content-center'>
                <img src="https://ictrd.in/assets/frontendTemplate/img/object.png" alt="" className="img-fluid" style={{ height: '80%', width: '80%' }} />
              </Col>
            </Row>
          </div>

        </div>


        <div className="container my-5 p-2 category">

          <h5 className='pb-4'>CATEGORIES</h5>

          {
            categories.length > 0 ?
              <div className="d-flex flex-wrap justify-content-around">
                {
                  categories.slice(0, 4).map(item => (

                    <div>
                      {
                        logStatus ?
                          <Link to={`/singlecat/${item.title}`} style={{ textDecoration: 'none' }}>
                            <Card className='cat-card' style={{ width: '10rem', cursor: 'pointer' }}>
                              <Card.Img variant="top" src={item?.photoUrl}
                                className='img-fluid mx-auto' style={{ height: '120px', width: '120px', }} />
                              <Card.Body>
                                <Card.Title className='c-title' style={{ fontSize: 'medium', fontWeight: '500', color: '#ff4747', textAlign: 'center' }}>{item?.title}</Card.Title>
                              </Card.Body>
                            </Card>
                          </Link>
                          :
                          <Link to={'/auth'} style={{ textDecoration: 'none' }}>
                            <Card className='cat-card' style={{ width: '10rem', cursor: 'pointer' }}>
                              <Card.Img variant="top" src={item?.photoUrl}
                                className='img-fluid mx-auto' style={{ height: '120px', width: '120px', }} />
                              <Card.Body>
                                <Card.Title className='c-title' style={{ fontSize: 'medium', fontWeight: '500', color: '#ff4747', textAlign: 'center' }}>{item?.title}</Card.Title>
                              </Card.Body>
                            </Card>
                          </Link>
                      }

                    </div>

                  ))
                }


              </div>
              :
              <h4 className='text-center text-danger'>No Categories Available!!</h4>
          }

          <div className='d-flex justify-content-center'>
           
            <Link to={'/allcat'} className="btn btn-outline btn2 mt-5">All Categories</Link>
          
          </div>
        </div>


        <div className="container my-5 p-2 category">

          <h5 className='pb-4'>COURSES</h5>

          {
            courses.length > 0 ?
              <div className="d-flex flex-wrap justify-content-around">
                {
                  courses.filter(item => item.part === '1').slice(0, 4).map(item => (
                    <Card className='shadow mb-3' style={{ width: '17rem' }} >
                      <div>
                        {
                          logStatus ?
                            <Link to={`/course/${item._id}`}>
                              <Card.Img variant="top" src={item?.imageUrl} className='img-fluid' style={{ height: '170px', cursor: 'pointer' }} />
                            </Link>
                            :
                            <Link to={`/course/${item._id}`}>
                              <Card.Img variant="top" src={item?.imageUrl} className='img-fluid' style={{ height: '170px', cursor: 'pointer' }} />
                            </Link>
                        }
                      </div>

                      <Card.Body>
                        <Card.Title className='title'>{item?.title}</Card.Title>
                        <Card.Text className='text'>
                          {item?.description} <b>|</b>
                          {
                            item?.part &&
                            <span> Part {item?.part}</span>
                          } <br />
                          {
                            item?.price > 0 &&
                            <p className='price'>$ {item?.price}</p>
                          }

                        </Card.Text>
                        {
                          logStatus ?
                            <Link to={`/singlecourse/${item.title}`} className="btn button" >Here We Go</Link>
                            :
                            <Link to={'/auth'} className="btn button" >Here We Go</Link>
                        }
                      </Card.Body>
                    </Card>
                  ))
                }
              </div>
              :
              <h4 className='text-center text-danger'>No Courses Available!!</h4>
          }

          <div className='d-flex justify-content-center'>
           
            <Link to={'/allcourses'} className="btn btn-outline btn2 mt-5"> All Courses </Link>

          </div>
        </div>

        <div className=' p-5 container category'>
          <h5 className='text-center mb-5'>STUDENT VOICES</h5>
          {
            reviews.length > 0 ?
              <div className="" id="reviews">
                {
                  reviews.map(item => (
                    <div className="p-3 border shadow mb-3 mx-2" id="tt" style={{ width: '300px' }}>
                      <h5>{item?.name}</h5>
                      <p style={{ textAlign: 'justify', overflow: 'auto', scrollbarWidth: 'none' }}>{item?.message}</p>
                    </div>
                  ))
                }
              </div>
              :
              <h4 className='text-center text-danger'>Student Voices Currently Unavailable..</h4>
          }
        </div>


        <Footer />
      </div>
    </>
  )
}

export default Landing