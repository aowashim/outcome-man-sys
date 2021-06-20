import React, { useState } from 'react'
import Loading from '../Loading'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addData } from '../../helpers/deptOcServer'

toast.configure()
const Add = props => {
  const [oc, setOc] = useState('')
  const [dname, setDname] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const notify = msg =>
    toast.error(msg, { position: toast.POSITION.TOP_CENTER })

  const handleAdd = async e => {
    e.preventDefault()

    setIsLoading(true)
    const data = await addData(`${props.path}`, oc, dname)

    if (!data[1]) {
      toast.success('Data added successfully...', {
        position: toast.POSITION.TOP_CENTER,
      })
      props.setReload(!props.reload)
      setOc('')
      setDname('')
    } else {
      notify(data[0])
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleAdd}>
      <div className='flex mt-5 bg-gray-400 p-3 justify-center mx-5 lg:mx-36 md:mx-20 rounded-3xl'>
        <div>
          <div>
            <label>Enter outcome : </label>
            <input
              type='text'
              required
              className='border rounded-lg border-green-400 ml-7'
              value={oc}
              onChange={e => setOc(e.target.value)}
            />
          </div>
          <div className='mt-2'>
            <label>Enter dept name : </label>
            <input
              type='text'
              required
              className='border rounded-lg border-green-400 ml-3'
              value={dname}
              onChange={e => setDname(e.target.value)}
            />
          </div>
          {isLoading ? (
            <div className='ml-56 mt-3'>
              <Loading size='1.5' />
            </div>
          ) : (
            <button
              className='border-0 bg-red-200 rounded-lg px-10 ml-48 mt-3'
              type='submit'
            >
              Add
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default Add
