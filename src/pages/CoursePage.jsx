import React, { useEffect, useState } from 'react'
import './bg.css'
import NewHeader from '../components/NewHeader'
import { useParams } from 'react-router-dom'
import { getSingleCourseByIdApi } from '../services/allApi'


function CoursePage() {

    const [course, setCourse] = useState([])
    const { id } = useParams()

    useEffect(() => {
        getSinglCourseById(id)

    }, [])

    const getSinglCourseById = async (id) => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getSingleCourseByIdApi(id, header)
        console.log(res)
        if (res.status == 200) {
            setCourse(res.data)
        }
    }

    return (
        <>
            <div className="bg container-fluid">
                <NewHeader />


                <div className="container p-3">
                    <h4 className='mt-3 mb-4' style={{ color: '#ff4747', }}>{course?.title}</h4>
                    <div className="w-75 border shadow rounded mb-5 p-3">
                        <h5>Description :</h5>
                        <p style={{ textAlign: 'justify' }}>{course?.description}
                        </p>
                        <h6>Topics Included :</h6>

                        <ul>
                            <li>{course?.topics}</li>

                        </ul>

                    </div>

                    <iframe width="100%" height="500" src={course.videoUrl} title="YouTube video player"
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                    </iframe>

                </div>
            </div>

        </>
    )
}

export default CoursePage