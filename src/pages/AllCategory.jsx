import React, { useEffect, useState } from 'react'
import CategoryCard from '../components/CategoryCard'
import './bg.css'
import NewHeader from '../components/NewHeader'
import { searchCategoryApi } from '../services/allApi'


function AllCategory() {

  const [allCat, setAllCat] = useState([])
  const [key, setKey] = useState("")


  useEffect(() => {
    getAllCategories()
  }, [key])

  const getAllCategories = async () => {
    const res = await searchCategoryApi(key)
    // console.log(res)
    if (res.status == 200) {
      setAllCat(res.data)
    }
  }


  return (
    <>
      <div className="bg container-fluid ">
        <NewHeader />
        <div className="container pt-4 p-3">
          <h3 className="text-center mb-3" style={{ color: '#ff4747', fontWeight: 'bold' }}>ALL CATEGORIES</h3>
          <div className='d-flex justify-content-end mt-4 mb-3'>
            <input type="search" name="" id="" onChange={(e) => setKey(e.target.value)} placeholder='Search by Category Name' className="form-control w-25" />
          </div>
        </div>
        {
          allCat.length > 0 ?
            <div className="container d-flex justify-content-around flex-wrap">
              {
                allCat.map(item => (
                  <CategoryCard category={item} />
                ))
              }

            </div>
            :
            <h4 className='text-center text-danger'>No Categories Available!!</h4>
        }
      </div>
    </>
  )
}

export default AllCategory