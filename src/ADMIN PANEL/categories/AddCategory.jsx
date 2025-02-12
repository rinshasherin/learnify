import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { addCategoryApi } from '../../services/allApi';
import { responseContext } from '../../ContextApi/ContextProvider';


function AddCategory() {

  const [show, setShow] = useState(false);

  const [category, setCategory] = useState({
    title: "", description: "", photoUrl: ""
  })

  const [preview, setPreview] = useState("")

  const { setResponse } = useContext(responseContext)

  useEffect(() => {
    if (category.photoUrl) {
      setPreview(category.photoUrl)
    }
    else {
      setPreview("")
    }
  }, [category.photoUrl])


  const handleAdd = async () => {
    console.log(category)
    const { title, description, photoUrl } = category
    if (!title || !description || !photoUrl) {
      toast.warning("Enter all inputs!!")
    }
    else {
      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      }
      const result = await addCategoryApi(category, header)
      // console.log(result)
      if (result.status == 200) {
        toast.success("Category added succesfully!!")
        handleClose()
        setResponse(result)
      }
      else {
        toast.error("Uploading failed!!")
        console.log(result)
      }
    }
  }



  const handleClose = () => {
    setShow(false)
    setCategory({
      title: "", description: "", photoUrl: ""
    })
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <button className='btn btn-warning mb-3' onClick={handleShow}>Add Category
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
              <img src={preview ? preview : "https://icon-library.com/images/category-icon-png/category-icon-png-14.jpg"} alt="" className="img-fluid" style={{ height: '250px' }} />
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <input type="text" name="" id="" placeholder='Enter Category Title' className="form-control mb-3" onChange={(e) => { setCategory({ ...category, title: e.target.value }) }} />
              <input type="text" name="" id="" placeholder='Enter Category Description' className="form-control mb-3" onChange={(e) => { setCategory({ ...category, description: e.target.value }) }} />
              <input type="text" name="" id="" placeholder='Enter Photo URL' className="form-control mb-3" onChange={(e) => { setCategory({ ...category, photoUrl: e.target.value }) }} />
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

export default AddCategory