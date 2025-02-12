import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function AdminDashboard() {

  const [isOpen, setIsOpen] = useState(true);

  const data = [
    { month: 'Jan', users: 100, courses: 50, categories: 80 },
    { month: 'Feb', users: 150, courses: 70, categories: 100 },
    { month: 'Mar', users: 200, courses: 90, categories: 130 },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
            <h1 className='text-secondary mb-5'>
              <button className="btn me-1" onClick={toggleSidebar}>
                <i className="fa-solid fa-bars fa-lg text-dark" />
              </button>
              Welcome Admin
            </h1>
            {/* <Line data={data} /> */}

            <ResponsiveContainer width="100%" height="70%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" />
                <Bar dataKey="courses" fill="#82ca9d" />
                <Bar dataKey="categories" fill="#fca103" />
              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>
      </div>

    </>
  )
}

export default AdminDashboard