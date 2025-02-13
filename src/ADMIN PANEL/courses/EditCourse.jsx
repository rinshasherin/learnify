import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { updateCourseApi } from '../../services/allApi';
import { responseContext } from '../../ContextApi/ContextProvider';

function EditCourse({ course }) {

  const [show, setShow] = useState(false);

  const [edit, setEdit] = useState({
    title: "", description: "", price: "", imageUrl: "", videoUrl: "", topics: "", part: 0, category: ""
  })

  const [preview, setPreview] = useState("")

  const { setResponse } = useContext(responseContext)

  useEffect(() => {
    setEdit({ ...course })
  }, [])


  useEffect(() => {
    if (edit.imageUrl) {
      setPreview(edit.imageUrl)
    }
    else {
      setPreview("")
    }
  }, [edit.imageUrl])


  const handleUpdate = async () => {
    console.log(edit)
    const { title, description, price, imageUrl, videoUrl, topics, part, category } = edit

    const watchUrl = edit.videoUrl
    const urls = watchUrl.split("v=")[1]
    const embedUrl = `https://www.youtube.com/embed/${urls}?si=D6h58DLDExlgZK42`
    edit.videoUrl = embedUrl

    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }

    const result = await updateCourseApi(course._id, header, edit)
    console.log(result)

    if (result.status == 200) {
      toast.success("Course updated successfully!!")
      handleClose()
      setResponse(result)
    }
    else {
      toast.error('Uploading failed!!')
      console.log(result)
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      <button className="btn btn-secondary me-2" onClick={handleShow}>
        <i className="fa-regular fa-pen-to-square" />
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className='modal-lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <img src={preview ? preview : edit.imageUrl} alt="" className="img-fluid" />
            </div>
            <div className="col">
              <input type="text" name="" id="" defaultValue={edit.title} placeholder='Enter Course Title' className="form-control mb-3" onChange={(e) => { setEdit({ ...edit, title: e.target.value }) }} />
              <input type="text" name="" id="" defaultValue={edit.description} placeholder='Enter Course Description' className="form-control mb-3" onChange={(e) => { setEdit({ ...edit, description: e.target.value }) }} />
              <input type="text" name="" id="" defaultValue={edit.imageUrl} placeholder='Enter Image URL' className="form-control mb-3" onChange={(e) => { setEdit({ ...edit, imageUrl: e.target.value }) }} />
              <input type="text" name="" id="" defaultValue={edit.videoUrl} placeholder='Enter Video URL' className="form-control mb-3" onChange={(e) => { setEdit({ ...edit, videoUrl: e.target.value }) }} />
              <textarea name="" id="" defaultValue={edit.topics} placeholder='Enter Included Topics' className="form-control mb-3" onChange={(e) => { setEdit({ ...edit, topics: e.target.value }) }}></textarea>
              <input type="text" name="" id="" defaultValue={edit.part} placeholder='Enter Part' className="form-control mb-3" onChange={(e) => { setEdit({ ...edit, part: e.target.value }) }} />
              <input type="text" name="" id="" defaultValue={edit.price} placeholder='Enter Course Price' className="form-control mb-3" disabled={edit.part === 'Part1'} onChange={(e) => { setEdit({ ...edit, price: e.target.value }) }} />
              <input type="text" name="" id="" defaultValue={edit.category} placeholder='Enter Category' className="form-control mb-3" onChange={(e) => { setEdit({ ...edit, category: e.target.value }) }} />
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default EditCourse