import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { deleteData, getData } from '../../helpers/connectToServer'
import AppContext from '../../store/AppContext'

export default function NavBar(props) {
  const [showDepts, setShowDepts] = useState(false)
  const depts = useRef([])
  const [isLoggedIn, setIsLoggedIn, loadData, setLoadData] =
    useContext(AppContext)

  //   const history = useHistory()

  const handleShowDepts = () => {
    const getDepts = async () => {
      depts.current = await getData('/dept')
      setShowDepts(true)
    }
    getDepts()
  }

  return showDepts ? (
    <div className='py-9'>
      <nav className='py-5 fixed top-0 inset-x-0 bg-gray-800 text-white flex justify-between'>
        <ul className='flex justify-between px-5'>
          {depts.current[0].map(data => (
            <li className='mr-5'>
              <NavLink
                key={data.id}
                exact
                activeClassName='underline text-blue-300'
                to={`/dept/${data.d_name}`}
              >
                {data.d_name}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className='flex justify-between px-5'>
          <li className='mr-5'>
            <button onClick={() => setShowDepts(false)}>Cancel</button>
          </li>
        </ul>
      </nav>
    </div>
  ) : (
    <div className='py-9'>
      <nav className='py-5 fixed top-0 inset-x-0 bg-gray-800 text-white flex justify-between'>
        <ul className='flex justify-between px-5'>
          <li className='mr-5'>
            <button onClick={handleShowDepts}>Departments</button>
          </li>
        </ul>
        <ul className='flex justify-between px-5'>
          <li>
            <button onClick={() => setIsLoggedIn(false)}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
