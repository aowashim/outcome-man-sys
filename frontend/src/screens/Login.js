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
        setIsLoggedIn(true)
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
    <div className='ml-72 mt-40'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User name : </label>
          <input
            type='text'
            required
            className='border rounded-lg border-green-400'
            value={user}
            onChange={e => setUser(e.target.value)}
          />
        </div>
        <div className='mt-4'>
          <label>Password : </label>
          <input
            type='password'
            required
            className='border rounded-lg border-green-400'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <button
            className='border-0 bg-red-200 rounded-lg pl-2 pr-2 pb-1 mt-3'
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
