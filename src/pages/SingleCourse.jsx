import React, { useEffect, useState } from 'react'
import NewHeader from '../components/NewHeader'
import './bg.css'
import { useParams } from 'react-router-dom'
import { getSingleCourseApi } from '../services/allApi'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'


function SingleCourse() {

    const [singleCourse, setSingleCourse] = useState([])

    const { title } = useParams()

    useEffect(() => {
        getSinglCourse()
    }, [])

    const getSinglCourse = async () => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getSingleCourseApi(title, header)
        console.log(res.data)
        if (res.status == 200) {
            setSingleCourse(res.data)
        }
    }


    return (
        <>
            <div className="container-fluid bg" >
                <NewHeader />

                <div className="container">
                    {
                        singleCourse.length > 0 ?
                            <div>
                                {
                                    singleCourse.slice(0, 1).map(item => (
                                        <h2 className='text-center my-2 mb-5' style={{ color: '#ff4747' }}>{item.title}</h2>
                                    ))
                                }
                            </div>
                            :
                            <></>
                    }

                    <div className='container my-5 row'>
                        <div className='col-lg-2'></div>
                        <div className='col-lg-8 border shadow-sm p-3 text-center'>
                            <h6 className='text-secondary my-3'>The journey begins free; Continue with a paid plan.</h6>
                            <Link to={'/subscribe'} className="btn abt my-3">Subscribe</Link>
                        </div>
                        <div className='col-lg-2'></div>

                    </div>

                    {
                        singleCourse.length > 0 ?
                            <div className="d-flex flex-wrap justify-content-around">
                                {
                                    singleCourse.map((item) => (

                                        <Card className='shadow mb-3' style={{ width: '17rem' }} >
                                            <div>
                                                <Link to={`/course/${item._id}`}>
                                                    <Card.Img variant="top" src={item?.imageUrl} className='img-fluid' style={{ height: '170px', cursor: 'pointer' }} />
                                                </Link>
                                            </div>
                                            <Card.Body>
                                                <Card.Title className='title'>{item?.title}</Card.Title>
                                                <Card.Text className='text'>
                                                    {item?.description} <b>|</b>
                                                    {
                                                        item?.part &&
                                                        <span> Part {item?.part}</span>
                                                    }
                                                    {
                                                        item?.price > 0 &&
                                                        <p className='price'>$ {item?.price}</p>
                                                    }

                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))
                                }
                            </div>
                            :
                            <></>
                    }
                </div>
            </div>
        </>
    )
}

export default SingleCourse