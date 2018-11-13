const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Secret = require('../../config/security').jtwSecret;

// Note that test in this case will refer to /api/user/test
// @route GET api/users/test
// @desc Test post route
// @access Public
router.get('/test', (req, res) =>
    res.json({
        msg: 'User works!',
        value: 'All clear!'
    })
);

// @route GET api/users/register
// @desc to register a new user
// @access Public
router.post('/register', (req, res) => {
    //check if user exists
    User.findOne({
        email: req.body.email
    }).then(user => {
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

            const saltSeed = Math.floor(Math.random() * 14 + 1);

            console.log(`Salt seed: ${saltSeed}`);

            bcrypt.genSalt(saltSeed, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (salterr, hashPassword) => {
                    if (salterr) throw salterr;
                    newUser.password = hashPassword;
                    console.log(`Salt: ${salt}, Hash Password: ${hashPassword}`);
                    newUser.nacl = salt;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(error => console.log(error));
                });
            });
        }
    });
});

// @route Post api/users/login
// @desc Login user (returning a Java Web Token)
// @access Public

router.post('/login', (req, resp) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find the user by e-mail
    User.findOne({
            email
        })
        //Check for user
        .then(user => {
            if (!user) {
                return resp.status(404).json({
                    message: 'User not found? Please check e-mail address.'
                });
            }
            //user found - check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {

                    //Create JWT Payload
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    };

                    const securityOptions = {
                        issuer: 'Intertek',
                        subject: user.email,
                        audience: 'https://www.intertek.com',
                        expiresIn: '1h',
                        algorithm: 'HS384'
                    };

                    jwt.sign(payload, Secret, securityOptions, (err, token) => {
                        return resp.json({
                            loginSuccess: true,
                            token: 'Bearer ' + token
                        });
                    });

                } else {
                    return resp.status(404).json({
                        password: 'Invalid password.'
                    });
                }
            });
        });
});

// @route Post api/users/login2
// @desc Login user (returning a Java Web Token)
// @access Public
router.post('/login2', (req, resp) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find the user by e-mail
    User.findOne({
            email
        })
        //Check for user
        .then(user => {
            if (!user) {
                return resp.status(404).json({
                    message: 'User not found.'
                });
            } else {
                //user found - check password
                return resp.status(200).json({
                    message: 'Ok'
                });
            }
        });
});


// @route GET api/users/current
// @desc Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;