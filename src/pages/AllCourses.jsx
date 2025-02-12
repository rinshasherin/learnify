import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import './bg.css'
import NewHeader from '../components/NewHeader'
import { searchCourseApi } from '../services/allApi'

function AllCourses() {

  const [allCourse, setAllCourse] = useState([])
  const [key, setKey] = useState("")

  useEffect(() => {
    getAllCourses()
  }, [key])

  const getAllCourses = async () => {
    const res = await searchCourseApi(key)
    // console.log(res)
    if (res.status == 200) {
      setAllCourse(res.data)
    }
  }

  return (
    <>
      <div className='bg container-fluid'>
        <NewHeader />
        <div className="p-3 pt-4 container">
          <h3 className='text-center mb-3' style={{ color: '#ff4747', fontWeight: 'bold' }} >ALL COURSES</h3>
          <div className="d-flex justify-content-end mt-4 mb-3">
            <input type="search" name="" id="" onChange={(e) => setKey(e.target.value)} placeholder='Search by Course Name' className="form-control w-25 " />
          </div>
        </div>
        {
          allCourse.length > 0 ?
            <div className="container d-flex flex-wrap justify-content-around">
              {
                allCourse.map(item => (
                  <CourseCard course={item} />
                ))
              }
            </div> :
            <h4 className='text-center text-danger'>No Courses Available!!</h4>
        }
      </div>
    </>
  )
}

export default AllCourses