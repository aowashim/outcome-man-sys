import React, { useContext, useEffect, useRef, useState } from 'react'
import { Redirect } from 'react-router-dom'
import AppContext from '../store/AppContext'
import { getData } from '../helpers/connectToServer'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar/NavBar'
import MyTable from '../components/MyTable'
import { PROG_OC } from '../constants/columns'
import Delete from '../components/Delete'
import Title from '../components/Title'

const Home = () => {
  const [isLoggedIn, setIsLoggedIn, loadData, setLoadData] =
    useContext(AppContext)
  const progData = useRef([])
  const [load, setLoad] = useState(false)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const getProgData = async () => {
      progData.current = await getData('/prog-oc')
      setLoad(!load)
    }
    getProgData()
    console.log('reloaded')
  }, [reload])

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return isLoggedIn ? (
    <div>
      <NavBar />
      <Title data='Program outcomes (B. Tech)' />
      <div>
        {progData.current.length ? (
          <div>
            <MyTable data={progData.current[0]} columns={PROG_OC} />
            <Delete path='/prog-oc' reload={reload} setReload={setReload} />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  ) : (
    <Redirect to='/' />
  )
}

export default Home
