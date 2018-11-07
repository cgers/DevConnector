const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// Note that test in this case will refer to /api/user/test
// @route GET api/users/test 
// @desc Test post route
// @access Public
router.get('/test', (req, res) => res.json({
    msg: 'User works!',
    value: 'All clear!'
}));


// @route GET api/users/register 
// @desc to register a new user
// @access Public
router.post('/register', (req, res) => {
    //check if user exists
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    email: 'Email already exists.'
                });
            } else {
                //Create new user
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar
                });
            }
        })
});

module.exports = router;