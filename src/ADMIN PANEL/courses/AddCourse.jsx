import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { addCourseApi } from '../../services/allApi';
import { responseContext } from '../../contextapi/ContextProvider';

function AddCourse() {

  const [show, setShow] = useState(false);

  const [course, setCourse] = useState({
    title: "", description: "", price: 0, imageUrl: "", videoUrl: "", topics: "", part: 0, category: ""
  })

  const [preview, setPreview] = useState("")

  const { setResponse } = useContext(responseContext)


  useEffect(() => {
    if (course.imageUrl) {
      setPreview(course.imageUrl)
    }
    else {
      setPreview("")
    }

  }, [course.imageUrl])


  const handleAdd = async () => {
    console.log(course)
    const { title, description, price, imageUrl, videoUrl, topics, part, category } = course
    if (!title || !description || !imageUrl || !videoUrl || !topics || !part || !category) {
      toast.warning("Enter all inputs!!")
    }
    else {
      const watchUrl = course.videoUrl
      const urls = watchUrl.split("v=")[1]
      const embedUrl = `https://www.youtube.com/embed/${urls}?si=D6h58DLDExlgZK42`
      course.videoUrl = embedUrl

      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      }

      const result = await addCourseApi(course, header)
      console.log(result)

      if (result.status == 200) {
        toast.success("Course added successfully!!")
        handleClose()
        setResponse(result)
      }
      else {
        toast.error('Uploading failed!!')
        console.log(result)
      }
    }
  }


  const handleClose = () => {
    setShow(false)
    setCourse({
      title: "", description: "", price: "", imageUrl: "", videoUrl: "", topics: "", part: "", category: ""
    })
  };
  const handleShow = () => setShow(true);

  return (
    <>

      <button className='btn btn-warning mb-3' onClick={handleShow}>Add Course
        <i className="fa-solid fa-plus ms-1" />
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className='modal-lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <img src={preview ? preview : "https://img.freepik.com/free-vector/online-school-platform-abstract-concept-illustration-homeschooling-online-education-platform-digital-classes-virtual-courses-lms-school_335657-3486.jpg"} alt="" className="img-fluid" />
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <input type="text" name="" id="" placeholder='Enter Course Title' className="form-control mb-3" onChange={(e) => { setCourse({ ...course, title: e.target.value }) }} />
              <input type="text" name="" id="" placeholder='Enter Course Description' className="form-control mb-3" onChange={(e) => { setCourse({ ...course, description: e.target.value }) }} />
              <input type="text" name="" id="" placeholder='Enter Image URL' className="form-control mb-3" onChange={(e) => { setCourse({ ...course, imageUrl: e.target.value }) }} />
              <input type="text" name="" id="" placeholder='Enter Video URL' className="form-control mb-3" onChange={(e) => { setCourse({ ...course, videoUrl: e.target.value }) }} />
              <textarea name="" id="" placeholder='Enter included Topics' className='form-control mb-3' onChange={(e) => { setCourse({ ...course, topics: e.target.value }) }}></textarea>
              <input type="text" name="" id="" placeholder='Enter  which Part' className="form-control mb-3" onChange={(e) => { setCourse({ ...course, part: e.target.value }) }} />
              <input type="text" name="" id="" placeholder='Enter Course Price' className="form-control mb-3" disabled={course.part === '1'} onChange={(e) => { setCourse({ ...course, price: e.target.value }) }} />
              <input type="text" name="" id="" placeholder='Enter Category' className="form-control mb-3" onChange={(e) => { setCourse({ ...course, category: e.target.value }) }} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default AddCourse