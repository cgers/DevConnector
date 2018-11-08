const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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
                //Get Avatar
                const avatarUrl = gravatar.url(req.body.email, {
                    s: '200', // Size
                    r: 'pg', // Rating
                    d: 'retro' // Default
                });

                //Create new user
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    nacl: 10,
                    avatar: avatarUrl
                });

                const saltSeed = Math.floor((Math.random() * 14) + 1);

                console.log(`Salt seed: ${saltSeed}`);

                bcrypt.genSalt(saltSeed, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (salterr, hashPassword) => {
                        if (salterr) throw salterr;
                        newUser.password = hashPassword;
                        console.log(`Salt: ${salt}, Hash Password: ${hashPassword}`);
                        newUser.nacl = salt;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(error => console.log(error));
                    })
                })
            }
        })
});

module.exports = router;