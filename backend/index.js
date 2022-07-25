
const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors') 

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

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})