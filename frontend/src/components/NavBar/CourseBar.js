import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AppContext from '../../store/AppContext'

export default function NavBar(props) {
  const [isLoggedIn, setIsLoggedIn] = useContext(AppContext)

  return (
    <div className='py-9'>
      <nav className='py-5 fixed top-0 inset-x-0 bg-gray-800 text-white flex justify-between'>
        <ul className='flex justify-between px-5'>
          <li className='mr-5'>
            <NavLink exact activeClassName='underline text-blue-300' to='/home'>
              Home
            </NavLink>
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
