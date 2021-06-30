import React, { useState } from 'react'
import Loading from '../Loading'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addData } from '../../helpers/progOcServer'

toast.configure()
const Add = props => {
  const [oc, setOc] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const notify = msg =>
    toast.error(msg, { position: toast.POSITION.TOP_CENTER })

  const handleAdd = async e => {
    e.preventDefault()

    setIsLoading(true)
    const data = await addData(`${props.path}`, oc)

    if (!data[1]) {
      toast.success('Data added successfully...', {
        position: toast.POSITION.TOP_CENTER,
      })
      props.setReload(!props.reload)
      setOc('')
    } else {
      notify(data[0])
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleAdd}>
      <div className='flex mt-12 bg-gray-100 p-3 justify-center mx-5 lg:mx-36 md:mx-20 rounded-3xl'>
        <label>Enter outcome : </label>
        <input
          type='text'
          required
          className='border rounded-lg border-green-400 ml-3'
          value={oc}
          onChange={e => setOc(e.target.value)}
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
            Add
          </button>
        )}
      </div>
    </form>
  )
}

export default Add
