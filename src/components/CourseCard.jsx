import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './coursecard.css'


function CourseCard({ course }) {

    const [logStatus, setLogStatus] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setLogStatus(true)
        }
        else {
            setLogStatus(false)
        }
    }, [])

    return (
        <>
            <div className="c2 ">
                <Card className='shadow mb-3' style={{ width: '17rem' }} >
                    <div>
                        {
                            logStatus ?
                                <Link to={`/course/${course._id}`} style={{ textDecoration: 'none' }}>
                                    <Card.Img variant="top" src={course.imageUrl} className='img-fluid' style={{ height: '170px', cursor: 'pointer' }} />
                                </Link>
                                :
                                <Link to={'/auth'} style={{ textDecoration: 'none' }}>
                                    <Card.Img variant="top" src={course.imageUrl} className='img-fluid' style={{ height: '170px', cursor: 'pointer' }} />
                                </Link>
                        }

                    </div>
                    <Card.Body>
                        <Card.Title className='title'>{course.title}</Card.Title>
                        <Card.Text className='text'>
                            {course.description} <b>|</b>
                            {
                                course.part &&
                                <span> Part {course.part}</span>
                            } <br />
                            {
                                course.price > 0 &&
                                <p className='price'>$ {course.price}</p>
                            }

                        </Card.Text>
                        {
                            logStatus ?
                                <Link to={`/singlecourse/${course.title}`} className="btn button" >Here We Go</Link>
                                :
                                <Link to={'/auth'} className="btn button" >Here We Go</Link>
                        }
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default CourseCard