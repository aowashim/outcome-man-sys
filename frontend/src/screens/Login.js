import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppContext from '../store/AppContext'
import { useHistory } from 'react-router-dom'
import Loading from '../components/Loading'
import { postData } from '../helpers/connectToServer'

toast.configure()
const Login = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const [isLoggedIn, setIsLoggedIn] = useContext(AppContext)

  const notify = msg =>
    toast.error(msg, { position: toast.POSITION.TOP_CENTER })

  const handleSubmit = async e => {
    e.preventDefault()

    setIsLoading(true)
    const data = await postData('/auth', user, password)

    if (!data[1]) {
      if (data[0]) {
        setIsLoggedIn(data[0].u_type)
        history.replace('/home')
      } else {
        notify('User not found. Incorrect user id or password.')
      }
    } else {
      notify(data[0])
    }

    setIsLoading(false)
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit}>
        <div className='mb-4 ml-24'>Enter user details...</div>
        <div className='bg-gray-100 p-6 rounded-md'>
          <div>
            <label>User name : </label>
            <input
              type='text'
              required
              className='border rounded-lg border-green-400 ml-1'
              value={user}
              onChange={e => setUser(e.target.value)}
            />
          </div>
          <div className='mt-4'>
            <label>Password : </label>
            <input
              type='password'
              required
              className='border rounded-lg border-green-400 ml-3'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>
        {isLoading ? (
          <div className='ml-36 mt-5'>
            <Loading size='1.7' />
          </div>
        ) : (
          <button
            className='border-0 bg-red-200 rounded-lg px-16 pb-1 mt-5 ml-20'
            type='submit'
          >
            Login
          </button>
        )}
      </form>
    </div>
  )
}

export default Login
