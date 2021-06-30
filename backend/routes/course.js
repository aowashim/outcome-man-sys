const express = require('express')
const router = express.Router()
const mysql = require('mysql')
require('dotenv').config()

// Get courses by depts
router.get('/:id', (req, res) => {
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
    `select * from course where d_name='${req.params.id}'`,
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

// Add a new course
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
    `insert into course values('${data.c_code}', '${data.c_name}', '${data.d_name}')`,
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

// Delete a course
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
    `delete from course where c_code='${data.c_code}'`,
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
