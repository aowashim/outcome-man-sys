import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { deleteData, getData } from '../../helpers/connectToServer'
import AppContext from '../../store/AppContext'
import Loading from '../Loading'

export default function NavBar(props) {
  const [showCourse, setShowCourse] = useState(false)
  const [loading, setLoading] = useState(false)
  const course = useRef([])
  const [isLoggedIn, setIsLoggedIn, loadData, setLoadData] =
    useContext(AppContext)

  //   const history = useHistory()

  const handleShowCourse = () => {
    setLoading(true)
    const getcourse = async () => {
      course.current = await getData('/course')
      setLoading(false)
      setShowCourse(true)
    }
    getcourse()
  }

  return showCourse ? (
    <div className='py-9'>
      <nav className='py-5 fixed top-0 inset-x-0 bg-gray-800 text-white flex justify-between'>
        <ul className='flex justify-between px-5'>
          {course.current[0].map(data => (
            <li className='mr-5 hover:text-red-500'>
              <NavLink key={data.c_code} exact to={`/course/${data.c_code}`}>
                {data.c_code}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className='flex justify-between px-5'>
          <li className='mr-5 hover:text-red-500'>
            <button onClick={() => setShowCourse(false)}>Cancel</button>
          </li>
        </ul>
      </nav>
    </div>
  ) : (
    <div className='py-9'>
      <nav className='py-5 fixed top-0 inset-x-0 bg-gray-800 text-white flex justify-between'>
        <ul className='flex justify-between px-5'>
          {loading ? (
            <li className='mr-7 mt-1'>
              <Loading size='1.5' />
            </li>
          ) : (
            <li className='mr-5 hover:text-red-500'>
              <button onClick={handleShowCourse}>Courses</button>
            </li>
          )}
        </ul>
        <ul className='flex justify-between px-5'>
          <li className='hover:text-red-500'>
            <button onClick={() => setIsLoggedIn(false)}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
