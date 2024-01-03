const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Sumitis$uper';

// Route 1: Create a User using: POST "/api/auth/createuser". No LogIn required
router.post('/createuser', [
    body('name', 'Enter a valid name.').isLength({min: 3}),
    body('password', 'Password must have atleast 8 characters.').isLength({min: 8}),
    body('email', 'Enter a valid email.').isEmail()
], async (req, res)=>{

    let success = false;
    // If there are errors then return bad request and the errors.
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array() });
    }

    // Check whether the user with this email already exists.
    let user;
    try {
        user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry, a user with this email already exists." });
        }

        // Securing the password in the database by hash and salt using bcrypt library.
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);

        // Creating a new user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword
        });

        // Assigning JSON WEB TOKEN to the newly created users and identifying them with their id's.
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        // Return the created user as a response.
        success = true;
        res.json({success, authToken});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



// Route 2: Authenticate a User using: POST "/api/auth/login". No LogIn required
router.post('/login', [
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password cannot be blank.').exists()
], async (req, res)=>{
    let success = false;

    // If there are errors then return bad request and the errors.
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring email and password.
    const {email, password} = req.body;
    try{

        // Checking and comparing the email and password if they are matched with the email and password in the database while the user newly created their account.
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success, error: "Please try to log in with correct credientials."});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please try to log in with correct credientials."});
        }

         // If the email and password matches with their data in the database then the authToken will be signed and provied to user as a response.
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        // Return the created user as a response.
        success = true;
        res.json({success,authToken})
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// Route 3: Get loggedIn User details using: POST "/api/auth/getuser". LogIn required
router.post('/getuser', fetchuser, async (req, res) => {
    try{
        // Since the user's id is in the auth-token, we are requesting the database to provide us the user id to decode the auth-token to get the information of the user.
        let userId = req.user.id;
        
        // Finding the user by their id and selecting every fields except their password.
        const user = await User.findById(userId).select("-password");
        res.json({user});

    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
    
module.exports = router