import React, { useContext, useEffect, useRef, useState } from 'react'
import { Redirect } from 'react-router-dom'
import AppContext from '../store/AppContext'
import { getData, updateData } from '../helpers/connectToServer'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar/NavBar'
import MyTable from '../components/MyTable'
import { PROG_OC } from '../constants/columns'
import Delete from '../components/Delete'
import Title from '../components/Title'
import Add from '../components/progOc/Add'
import Update from '../components/Update'

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useContext(AppContext)
  const progData = useRef([])
  const [load, setLoad] = useState(false)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const getProgData = async () => {
      progData.current = await getData('/prog-oc')
      setLoad(!load)
    }
    getProgData()
  }, [reload])

  return isLoggedIn ? (
    <div>
      <NavBar />
      <Title data='Program outcomes (B. Tech)' />
      <div>
        {progData.current.length ? (
          <div>
            <MyTable data={progData.current[0]} columns={PROG_OC} />
            {isLoggedIn == 'admin' && (
              <>
                <Add path='/prog-oc' reload={reload} setReload={setReload} />
                <Delete path='/prog-oc' reload={reload} setReload={setReload} />
                <Update path='/prog-oc' reload={reload} setReload={setReload} />
              </>
            )}
          </div>
        ) : (
          <div className='w-screen h-screen flex justify-center items-center'>
            <Loading size='4' />
          </div>
        )}
      </div>
    </div>
  ) : (
    <Redirect to='/' />
  )
}

export default Home
