import React, { useState } from 'react'
import Loading from './Loading'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { deleteData } from '../helpers/connectToServer'

toast.configure()
const Delete = props => {
  const [id, setId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const notify = msg =>
    toast.error(msg, { position: toast.POSITION.TOP_CENTER })

  const handleDelete = async e => {
    e.preventDefault()

    setIsLoading(true)
    const data = await deleteData(`${props.path}`, id)

    if (!data[1]) {
      toast.success('Delete successfull', {
        position: toast.POSITION.TOP_CENTER,
      })
      props.setReload(!props.reload)
      setId('')
    } else {
      notify(data[0])
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleDelete}>
      <div className='flex mt-5 bg-gray-100 p-3 justify-center mx-5 lg:mx-36 md:mx-20 rounded-3xl'>
        <label>Enter id : </label>
        <input
          type='text'
          required
          className='border rounded-lg border-green-400 ml-3'
          value={id}
          onChange={e => setId(e.target.value)}
        />
        {isLoading ? (
          <div className='ml-3'>
            <Loading size='1.7' />
          </div>
        ) : (
          <button
            className='border-0 bg-red-200 rounded-lg pl-2 pr-2 pb-1 ml-4'
            type='submit'
          >
            Delete
          </button>
        )}
      </div>
    </form>
  )
}

export default Delete
