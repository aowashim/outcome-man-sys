import React, { useState } from 'react'
import Loading from './Loading'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { updateData } from '../helpers/connectToServer'

toast.configure()
const Update = props => {
  const [oc, setOc] = useState('')
  const [atn, setAtn] = useState('')
  const [id, setId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const notify = msg =>
    toast.error(msg, { position: toast.POSITION.TOP_CENTER })

  const handleUpdate = async e => {
    e.preventDefault()

    setIsLoading(true)
    const data = await updateData(`${props.path}`, id, oc, atn)

    if (!data[1]) {
      toast.success('Data updated successfully...', {
        position: toast.POSITION.TOP_CENTER,
      })
      props.setReload(!props.reload)
      setOc('')
      setAtn('')
      setId('')
    } else {
      notify(data[0])
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleUpdate}>
      <div className='flex mt-5 bg-gray-400 p-3 justify-center mx-5 lg:mx-36 md:mx-20 rounded-3xl mb-3'>
        <div>
          <div>
            <label>Enter id : </label>
            <input
              type='text'
              required
              className='border rounded-lg border-green-400 ml-16'
              value={id}
              onChange={e => setId(e.target.value)}
            />
          </div>
          <div className='mt-2'>
            <label>Enter outcome : </label>
            <input
              type='text'
              required
              className='border rounded-lg border-green-400 ml-4'
              value={oc}
              onChange={e => setOc(e.target.value)}
            />
          </div>
          <div className='mt-2'>
            <label>Enter attainment : </label>
            <input
              type='text'
              required
              className='border rounded-lg border-green-400 ml-1'
              value={atn}
              onChange={e => setAtn(e.target.value)}
            />
          </div>
          {isLoading ? (
            <div className='ml-56 mt-3'>
              <Loading size='1.5' />
            </div>
          ) : (
            <button
              className='border-0 bg-red-200 rounded-lg px-8 ml-44 mt-3'
              type='submit'
            >
              Update
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default Update
