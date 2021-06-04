const express = require('express')
const router = express.Router()
const mysql = require('mysql')
require('dotenv').config()

// Check user
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
    `select * from auth where u_name='${data.u_name}' and u_pwd='${data.u_pwd}'`,
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
