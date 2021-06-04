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
            <Delete path='/dept-oc' reload={reload} setReload={setReload} />
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

export default Depts
