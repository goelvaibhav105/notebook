const express = require('express');
const User = require('../models/User');
const router = express.Router();

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
    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    })
    res.json(user)
    
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