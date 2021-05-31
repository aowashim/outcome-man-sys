const express = require('express')
const router = express.Router()
const mysql = require('mysql')
require('dotenv').config()

// Get department outcomes
router.get('/', (req, res) => {
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
    `select * from dept_oc where d_name='${data.d_name}'`,
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
    `insert into dept_oc(d_oc,d_name,atn) values('${data.d_oc}','${data.d_name}',${data.atn})`,
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
    `delete from dept_oc where id=${data.id}`,
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
    `update dept_oc set d_oc='${data.d_oc}', d_name='${data.d_name}', atn=${data.atn} where id=${data.id}`,
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
