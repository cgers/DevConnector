const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Secret = require('../../config/security').jtwSecret;

// Load input validation
const validateRegisterInput = require('../../validation/register');

//load validate Login Input
const validateLoginInput = require('../../validation/login');

// Note that test in this case will refer to /api/user/test
// @route GET api/user/test
// @desc Test post route
// @access Public
router.get('/test', (req, res) =>
	res.json({
		msg: 'User works!',
		value: 'All clear!'
	})
);

// @route POST api/user/register
// @desc Register a new user
// @access Public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	//Check validation for registration - validations/register.js
	if (!isValid) {
		return res.status(400).json(errors);
	}

	//check if user exists
	User.findOne({
		email: req.body.email
	}).then((user) => {
		if (user) {
			errors.email = 'This E-mail addres is already registered.';
			return res.status(400).json(errors);
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
					newUser.save().then((user) => res.status(200).json(user)).catch((error) => console.log(error));
				});
			});
		}
	});
});

// @route Post api/user/login
// @desc Login user (returning a Java Web Token)
// @access Public

router.post('/login', (req, resp) => {
	const { errors, isValid } = validateLoginInput(req.body);

	//Check validation for registration - validations/register.js
	if (!isValid) {
		return resp.status(400).json(errors);
	}
	//Find the user by e-mail
	user
		.findOne({
			email: req.body.email
		})
		//Check for user
		.then((user) => {
			if (!user) {
				errors.email = 'User not found.';
				return resp.status(404).json(errors);
			}
			//user found - check password
			bcrypt.compare(req.body.password, user.password).then((isMatch) => {
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
						expiresIn: '2h',
						algorithm: 'HS384'
					};

					jwt.sign(payload, Secret, securityOptions, (err, token) => {
						return resp.json({
							loginSuccess: true,
							token: 'Bearer ' + token,
							user: user
						});
					});
				} else {
					errors.password = 'Invalid password.';
					return resp.status(404).json(errors);
				}
			});
		});
});

// @route Post api/user/login2
// @desc Login user (returning a Java Web Token)
// @access Public
router.post('/login2', (req, resp) => {
	const email = req.body.email;
	const password = req.body.password;

	//Find the user by e-mail
	user
		.findOne({
			email
		})
		//Check for user
		.then((user) => {
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

// @route GET api/user/current
// @desc Return current user
// @access Private
router.get(
	'/current',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		return res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email
		});
	}
);

module.exports = router;
