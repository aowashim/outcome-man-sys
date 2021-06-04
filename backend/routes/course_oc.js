const express = require('express')
const router = express.Router()
const mysql = require('mysql')
require('dotenv').config()

// Get course outcomes
router.get('/:id', (req, res) => {
  //const data = req.body

  const myConnection = mysql.createConnection(process.env.CON_URI)

  myConnection.connect(err => {
    if (err) {
      console.log(err.message)
      return res.status(500).send('Server error...')
    } else {
      console.log('Connected...')
    }
  })

  myConnection.query(
    `select * from course_oc where c_code='${req.params.id}'`,
    (err, results) => {
      if (err) {
        res.status(500).json(err.message)
      } else {
        res.status(200).json(results)
      }
    }
  )

  myConnection.end()
})

// Add a new outcome
router.post('/', (req, res) => {
  const data = req.body

  const myConnection = mysql.createConnection(process.env.CON_URI)

  myConnection.connect(err => {
    if (err) {
      console.log(err.message)
      return res.status(500).send('Server error...')
    } else {
      console.log('Connected...')
    }
  })

  myConnection.query(
    `insert into course_oc(c_oc,c_code,atn) values('${data.c_oc}','${data.c_code}',${data.atn})`,
    (err, results) => {
      if (err) {
        res.status(500).json(err.message)
      } else {
        res.status(201).json(results)
      }
    }
  )

  myConnection.end()
})

// Delete an outcome
router.delete('/', (req, res) => {
  const data = req.body

  const myConnection = mysql.createConnection(process.env.CON_URI)

  myConnection.connect(err => {
    if (err) {
      console.log(err.message)
      return res.status(500).send('Server error...')
    } else {
      console.log('Connected...')
    }
  })

  myConnection.query(
    `delete from course_oc where id=${data.id}`,
    (err, results) => {
      if (err) {
        res.status(500).json(err.message)
      } else {
        res.status(200).json(results)
      }
    }
  )

  myConnection.end()
})

// Update an outcome
router.put('/', (req, res) => {
  const data = req.body

  const myConnection = mysql.createConnection(process.env.CON_URI)

  myConnection.connect(err => {
    if (err) {
      console.log(err.message)
      return res.status(500).send('Server error...')
    } else {
      console.log('Connected...')
    }
  })

  myConnection.query(
    `update course_oc set c_oc='${data.c_oc}', c_code='${data.c_code}', atn=${data.atn} where id=${data.id}`,
    (err, results) => {
      if (err) {
        res.status(500).json(err.message)
      } else {
        res.status(200).json(results)
      }
    }
  )

  myConnection.end()
})

module.exports = router
