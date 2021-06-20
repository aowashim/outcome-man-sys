import React, { useContext, useEffect, useRef, useState } from 'react'
import { Redirect } from 'react-router-dom'
import AppContext from '../store/AppContext'
import { getDataById } from '../helpers/connectToServer'
import Loading from '../components/Loading'
import MyTable from '../components/MyTable'
import CourseBar from '../components/NavBar/CourseBar'
import { COURSE_OC } from '../constants/columns'
import Delete from '../components/Delete'
import Title from '../components/Title'
import Add from '../components/courseOc/Add'
import Update from '../components/Update'

const Courses = props => {
  const [isLoggedIn, setIsLoggedIn, loadData, setLoadData] =
    useContext(AppContext)
  const progData = useRef([])
  const [load, setLoad] = useState(false)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const getProgData = async () => {
      progData.current = await getDataById('/course-oc', props.match.params.id)
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
      <CourseBar />
      <Title data={`Course outcomes (${props.match.params.id})`} />
      <div>
        {progData.current.length ? (
          <div>
            <MyTable data={progData.current[0]} columns={COURSE_OC} />
            <Add path='/course-oc' reload={reload} setReload={setReload} />
            <Delete path='/course-oc' reload={reload} setReload={setReload} />
            <Update path='/course-oc' reload={reload} setReload={setReload} />
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

export default Courses
