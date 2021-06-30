import React, { useRef, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './screens/Home'
import Depts from './screens/Depts'
import Login from './screens/Login'
import AppContext from './store/AppContext'
import Courses from './screens/Courses'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState('')

  return (
    <Router>
      <AppContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/home' exact component={Home} />
          <Route path='/dept/:id' exact component={Depts} />
          <Route path='/course/:id' exact component={Courses} />
        </Switch>
      </AppContext.Provider>
    </Router>
  )
}

export default App
