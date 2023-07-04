const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5001

const app = express()

app.use(express.json())//to get values from body as they are undefined warna
app.use(express.urlencoded({ extended: false })) //middleware to accept data from body

app.use('/api/goals', require('./routes/goalRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))