import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import './categorycard.css'
import { Link } from 'react-router-dom';

function CategoryCard({ category }) {

    const [logStatus, setLogStatus] = useState(false)


    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setLogStatus(true)
        }
        else {
            setLogStatus(false)
        }
    }, [])


    return (
        <>
            <div className="c1 shadow mb-3">
                {
                    logStatus ?
                        <Link to={`/singlecat/${category?.title}`} style={{ textDecoration: 'none' }}>
                            <Card style={{ width: '10rem', cursor: 'pointer' }}>
                                <Card.Img variant="top" src={category?.photoUrl} className='img-fluid mx-auto' style={{ height: '120px', width: '120px', }} />
                                <Card.Body>
                                    <Card.Title className='c-title' style={{ fontSize: 'medium', fontWeight: '500', color: '#ff4747', textAlign: 'center' }}>{category?.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                        :
                        <Link to={'/auth'} style={{ textDecoration: 'none' }}>
                            <Card style={{ width: '10rem', cursor: 'pointer' }}>
                                <Card.Img variant="top" src={category?.photoUrl} className='img-fluid mx-auto' style={{ height: '120px', width: '120px', }} />
                                <Card.Body>
                                    <Card.Title className='c-title' style={{ fontSize: 'medium', fontWeight: '500', color: '#ff4747', textAlign: 'center' }}>{category?.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                }

            </div>
        </>
    )
}

export default CategoryCard