const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/dept', require('./routes/dept'))
app.use('/dept-oc', require('./routes/dept_oc'))
app.use('/course', require('./routes/course'))
app.use('/course-oc', require('./routes/course_oc'))
app.use('/prog-oc', require('./routes/prog_oc'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))
