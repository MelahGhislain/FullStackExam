const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')

const app = express()
const port = 4000
const mongoURL = 'mongodb://localhost:27017/student'
app.use(cors({origin: true}))

app.use(express.json())
app.use('/api/v1', routes())



mongoose.connect(mongoURL,{useUnifiedTopology: true}, (err)=>{
    if(err) return console.log('Something when wrong db did not connect')
    console.log('DB connected successfully')
    app.listen(port, ()=>console.log(`Server running on port ${port}`))
})


