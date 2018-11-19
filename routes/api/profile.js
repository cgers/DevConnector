const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load profile model
const Profile = require('../../models/profile');
//Load user model
const user = require('../../models/user');

//Load Profile Validation
const validateProfileInput = require('../../validation/profile');

//Note that test in this case will refer to /api/profile/test
// @route GET api/profile/test
// @desc Test post route
// @access Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Profile works!'
  })
);

//Note that test in this case will refer to /api/profile/test
// @route GET api/profile
// @desc Get current users profile
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const errors = {};

    Profile
      .findOne({
        user: req.user.id
      })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'No profile found for ' + req.user.name + '.';
          return res.status(404).json(errors);
        }
        res.status(200).json(profile);
      })
      .catch(error => res.status(404).json(error));
  }
);

//Note that test in this case will refer to /api/profile/test
// @route POST api/profile
// @desc Create or Edit User Profile
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {

    const {
      errors,
      isValid
    } = validateProfileInput(req.body);

    if (!isValid) {
      //retun the errors with 400 status
      return res.status(400).json(errors);
    }

    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;

    //Social Fields
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram =
      req.body.instagram;
    if (req.body.facebook) profileFields.social.facebook =
      req.body.facebook;

    //Skills - split comma string into array.
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    if (typeof req.body.registeredDate === 'undefined') {
      profileFields.registeredDate = Date.now();
    } else {
      profileFields.registeredDate = req.body.registeredDate;
    }

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate({
          user: req.user.id
        }, {
          $set: profileFields
        }, {
          new: true
        }).then(profile => res.json(profile));
      } else {
        //create new profile
        //Check if handle exists
        Profile.findOne({
          handle: profileFields.handle
        }).then(profile => {
          if (profile) {
            error.handle = 'That handle already exists.';
            res.status(400).json(errors);
          }
        });
        //Save profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

module.exports = router;