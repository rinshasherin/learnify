import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../home/Sidebar'
import AddCategory from './AddCategory'
import { responseContext } from '../../ContextApi/ContextProvider'
import { deleteCategoryApi, getCategoriesApi } from '../../services/allApi'
import EditCategory from './EditCategory'

function Categories() {

  const [categories, setCategories] = useState([])

  const { response } = useContext(responseContext)

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    getCategories()
  }, [response])

  const getCategories = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await getCategoriesApi(header)
    // console.log(res)
    if (res.status == 200) {
      setCategories(res.data)
    }
  }

  const handleDelete = async (id) => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await deleteCategoryApi(id, header)
    // console.log(res)
    if (res.status == 200) {
      getCategories()
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
              Categories</h1>

            <AddCategory />

            {
              categories.length > 0 ?
                <table className='table table-bordered'>
                  <thead className='table-info'>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categories.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item?.title}</td>
                          <th>
                            <img src={item?.photoUrl} className='img-fluid' width={'150px'} alt="" />
                          </th>
                          <td>

                            <EditCategory category={item} />

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
                <h4 className="text-center text-danger">No Categories Available!!</h4>
            }

          </div>
        </div>
      </div>

    </>
  )
}

export default Categories