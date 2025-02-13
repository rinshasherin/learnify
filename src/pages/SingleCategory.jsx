import React, { useEffect, useState } from 'react'
import './bg.css'
import NewHeader from '../components/NewHeader'
import { getSingleCategoryApi } from '../services/allApi'
import { useParams } from 'react-router-dom'
import { getSameCourseApi } from '../services/allApi'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'


function SingleCategory() {

  const [cat, setCat] = useState([])
  const [courseByCat, setCourseByCat] = useState([])
  const { title } = useParams()


  useEffect(() => {
    getSingleCategory()
    getSameCourse()

  }, [title])

  const getSingleCategory = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await getSingleCategoryApi(title, header)
    // console.log(res)
    if (res.status == 200) {
      setCat(res.data[0])
    }
  }


  const getSameCourse = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await getSameCourseApi(header, title)
    // console.log(res)
    if (res.status == 200) {
      setCourseByCat(res.data)
    }
  }



  return (
    <>

      <div className="container-fluid bg" >
        <NewHeader />

        <div className="container">
          <div>
            <h2 className='text-center my-2' style={{ color: '#ff4747' }}>{cat?.title} Category</h2>
            <h6 className='my-5'>Description : <span style={{ fontSize: '14px' }}>{cat?.description}</span></h6>
          </div>

          <h6 className='my-5'>Videos : {courseByCat?.length} videos</h6>

          {
            courseByCat.length > 0 ?
              <div className="container d-flex justify-content-around flex-wrap">
                {
                  courseByCat.map(item => (
                    <Card className='shadow mb-3' style={{ width: '17rem' }} >
                      <Link to={`/course/${item._id}`}>
                        <Card.Img variant="top" src={item?.imageUrl} className='img-fluid' style={{ height: '170px', cursor: 'pointer' }} />
                      </Link>
                      <Card.Body>
                        <Card.Title className='title'>{item?.title}</Card.Title>
                        <Card.Text className='text'>
                          {item?.description} <b>|</b>
                          {
                            item?.part &&
                            <span> Part {item?.part}</span>
                          } <br />
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
              <div style={{ height: '410px' }}>
                <h4 className='text-center text-warning'>There are no Courses under this Category!!</h4>
              </div>
          }

        </div>
      </div>
    </>
  )
}

export default SingleCategory