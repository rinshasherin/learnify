import { useContext, useState } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './pages/auth/Auth';
import Landing from './pages/landing/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import AllCourses from './pages/AllCourses';
import CoursePage from './pages/CoursePage';
import { Routes, Route } from 'react-router-dom';
import AllCategory from './pages/AllCategory';
import SingleCategory from './pages/SingleCategory';
import SingleCourse from './pages/SingleCourse';
import Subscription from './pages/Subscription';
import AdminDashboard from './ADMIN PANEL/home/AdminDashboard';
import Courses from './ADMIN PANEL/courses/Courses';
import Categories from './ADMIN PANEL/categories/Categories';
import UserList from './ADMIN PANEL/users/UserList';
import Reviews from './ADMIN PANEL/reviews/Reviews';
import Profile from './pages/Profile';
import { logContext } from '../contextapi/AuthContext';


function App() {

  const { logStatus } = useContext(logContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/profile' element={logStatus ? <Profile /> : <Auth />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/allcourses' element={<AllCourses />} />
        <Route path='/course/:id' element={logStatus ? <CoursePage /> : <Auth />} />
        <Route path='/allcat' element={<AllCategory />} />
        <Route path='/singlecat/:title' element={logStatus ? <SingleCategory /> : <Auth />} />
        <Route path='/singlecourse/:title' element={logStatus ? <SingleCourse /> : <Auth />} />
        <Route path='/subscribe' element={logStatus ? <Subscription /> : <Auth />} />

        {/* admin */}
        <Route path='/admin-db' element={logStatus ? <AdminDashboard /> : <Auth />} />
        <Route path='/Courses' element={logStatus ? <Courses /> : <Auth />} />
        <Route path='/Categories' element={logStatus ? <Categories /> : <Auth />} />
        <Route path='/Users' element={logStatus ? <UserList /> : <Auth />} />
        <Route path='/Reviews' element={logStatus ? <Reviews /> : <Auth />} />


      </Routes>
      <ToastContainer />

    </>
  )
}

export default App
