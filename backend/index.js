const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000


// middleware to use application/json 
app.use(cors())
app.use(express.json())
require("dotenv").config();

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// to chk the / method

// app.get('/',(req,res) =>{
//   res.send('Hello Vaibhav !')
// })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})