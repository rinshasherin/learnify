import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../home/Sidebar'
import AddCourse from './AddCourse'
import { deleteCourseApi, getCoursesApi } from '../../services/allApi'
import { responseContext } from '../../contextApi/ContextProvider'
import EditCourse from './EditCourse'

function Courses() {

  const [courses, setCourses] = useState([])

  const { response } = useContext(responseContext)

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    getCourses()
  }, [response])

  const getCourses = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await getCoursesApi(header)
    console.log(res)
    if (res.status == 200) {
      setCourses(res.data)
    }
  }

  const handleDelete = async (id) => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await deleteCourseApi(id, header)
    console.log(res)
    if (res.status == 200) {
      getCourses()
    }
    else {
      toast.warning("Something Went Wrong!!")
      console.log(res)
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {
            isOpen ?
              <Sidebar />
              :
              <></>
          }
          <div className='col p-3 container'>
            <h1 className='text-secondary mb-3'>
              <button className="btn me-1" onClick={toggleSidebar}>
                <i class="fa-solid fa-bars fa-lg text-dark" />
              </button>
              Courses</h1>
            <AddCourse />

            {
              courses.length > 0 ?
                <table className='table table-bordered'>
                  <thead className='table-info'>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Image</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      courses.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item?.title}</td>
                          <td>{item?.category}</td>
                          <th>
                            <img src={item?.imageUrl} className='img-fluid' width={'200px'} alt="" />
                          </th>
                          <td>
                            <EditCourse course={item} />

                            <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>
                              <i className="fa-solid fa-trash" />
                            </button>
                          </td>
                        </tr>
                      ))
                    }

                  </tbody>
                </table>
                :
                <h4 className="text-center text-danger">No Courses Available!!</h4>
            }
          </div>
        </div>
      </div>

    </>
  )
}

export default Courses