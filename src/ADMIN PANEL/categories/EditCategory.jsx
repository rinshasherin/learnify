import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { updateCategoryApi } from '../../services/allApi';
import { responseContext } from '../../contextapi/ContextProvider';

function EditCategory({ category }) {

  const [show, setShow] = useState(false);

  const [edit, setEdit] = useState({
    title: "", description: "", photoUrl: ""
  })

  const [preview, setPreview] = useState("")

  const { setResponse } = useContext(responseContext)

  useEffect(() => {
    setEdit({ ...category })
  }, [])


  useEffect(() => {
    if (edit.photoUrl) {
      setPreview(edit.photoUrl)
    }
    else {
      setPreview("")
    }
  }, [edit.photoUrl])


  const handleUpdate = async () => {
    console.log(edit)
    const { title, description, photoUrl } = edit
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }

    const result = await updateCategoryApi(category._id, header, edit)
    console.log(result)

    if (result.status == 200) {
      toast.success("Category updated successfully!!")
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
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <img src={preview ? preview : edit.photoUrl} alt="" className="img-fluid" />
            </div>
            <div className="col">
              <input type="text" name="" id="" defaultValue={edit.title} placeholder='Enter Category Title' className="form-control mb-3" onChange={(e) => { setEdit({ ...edit, title: e.target.value }) }} />
              <input type="text" name="" id="" defaultValue={edit.description} placeholder='Enter Category Description' className="form-control mb-3" onChange={(e) => { setEdit({ ...edit, description: e.target.value }) }} />
              <input type="text" name="" id="" defaultValue={edit.photoUrl} placeholder='Enter Category Photo URL' className="form-control mb-3" onChange={(e) => { setEdit({ ...edit, photoUrl: e.target.value }) }} />
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

export default EditCategory