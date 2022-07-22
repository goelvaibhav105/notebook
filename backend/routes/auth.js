const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');

// it is used to send the token basically used for aafter login step 
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'vaibSecret@123';

// chk to use validate 
const { body, validationResult } = require('express-validator');


// to Chk 

router.get('/',(req,res)=>{
  res.send('User Route coming successfully')
})


// Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  //console.log('if yoy want to see what is comming in res',res.body);
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check whether the user with this email exists already
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    // addingSALt await is nesassary 
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    const data = {
      user:{
        id: user.id
      }
    }
    // first it is taking our data and 2d is the secret 
    
    const authtoken = jwt.sign(data, JWT_SECRET);
    

    // res.json(user)
    res.json({authtoken})
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
})


// CHK METHOD and this will also work but see no validation and all are there 

// router.post('/createUser',(req,res)=>{
//   const user = User(req.body);
//   user.save()
//   res.send(req.body);
// })



module.exports = router