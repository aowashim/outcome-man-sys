import React, { useContext, useEffect, useRef, useState } from 'react'
import { Redirect } from 'react-router-dom'
import AppContext from '../store/AppContext'
import { getDataById } from '../helpers/connectToServer'
import Loading from '../components/Loading'
import MyTable from '../components/MyTable'
import DeptBar from '../components/NavBar/DeptBar'
import { DEPT_OC } from '../constants/columns'
import Delete from '../components/Delete'
import Title from '../components/Title'
import Add from '../components/deptOc/Add'
import Update from '../components/Update'

const Depts = props => {
  const [isLoggedIn, setIsLoggedIn, loadData, setLoadData] =
    useContext(AppContext)
  const progData = useRef([])
  const [load, setLoad] = useState(false)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const getProgData = async () => {
      progData.current = await getDataById('/dept-oc', props.match.params.id)
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
      <DeptBar />
      <Title data={`Department outcomes (${props.match.params.id})`} />
      <div>
        {progData.current.length ? (
          <div>
            <MyTable data={progData.current[0]} columns={DEPT_OC} />
            <Add path='/dept-oc' reload={reload} setReload={setReload} />
            <Delete path='/dept-oc' reload={reload} setReload={setReload} />
            <Update path='/dept-oc' reload={reload} setReload={setReload} />
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

export default Depts
