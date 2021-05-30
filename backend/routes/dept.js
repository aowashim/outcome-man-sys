const express = require('express')
const router = express.Router()
const mysql = require('mysql')
require('dotenv').config()

// Get all departments
router.get('/', (req, res) => {
  const myConnection = mysql.createConnection(process.env.CON_URI)

  myConnection.connect(err => {
    if (err) {
      console.log(err.message)
      return res.status(500).send('Server error...')
    } else {
      console.log('Connected...')
    }
  })

  myConnection.query('select * from dept', (err, results) => {
    if (err) {
      res.status(500).json(err.message)
    } else {
      res.status(200).json(results)
    }
  })

  myConnection.end()
})

// Add a new department
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
    `insert into dept(d_name) values('${data.d_name}')`,
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

// Delete a department
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

  myConnection.query(`delete from dept where id=${data.id}`, (err, results) => {
    if (err) {
      res.status(500).json(err.message)
    } else {
      res.status(200).json(results)
    }
  })

  myConnection.end()
})

module.exports = router
