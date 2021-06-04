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
    } else {
      notify(data[0])
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleDelete}>
      <label>Enter id : </label>
      <input
        type='text'
        required
        className='border rounded-lg border-green-400'
        value={id}
        onChange={e => setId(e.target.value)}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <button
          className='border-0 bg-red-200 rounded-lg pl-2 pr-2 pb-1 mt-3'
          type='submit'
        >
          Delete
        </button>
      )}
    </form>
  )
}

export default Delete
