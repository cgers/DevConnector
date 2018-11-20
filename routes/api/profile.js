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

//Load Profile Education Validation
const validateProfileEducationInput = require('../../validation/education');

//Load Profile Experience Validation
const validateProfileExperienceInput = require('../../validation/experience');

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

    Profile.findOne({
        user: req.user.id
      })
      //Add the user name and avatar to the data in the profile object
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
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

    //Skills - split comma string into array.
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.trim().split(', ');

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

//Note that test in this case will refer to /api/profile/test
// @route POST api/profile/experience
// @desc Add experience to user profile
// @access Private
router.post(
  '/experience',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    //Validate
    const {
      errors,
      isValid
    } = validateProfileExperienceInput(req.body);

    console.log(`validateProfileExperienceInput isValid: ${isValid}`);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      //Create new Experience Object
      const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        datefrom: req.body.datefrom,
        dateto: req.body.dateto,
        current: req.body.current,
        description: req.body.description
      };
      //Add to experienc array - at the beginning
      profile.experience.unshift(newExperience);
      profile.save().then(profile => res.json(profile));
    });
  }
);

//Note that test in this case will refer to /api/profile/test
// @route POST api/profile/education
// @desc Add education to user profile
// @access Private
router.post(
  '/education',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    //Validate education
    const {
      errors,
      isValid
    } = validateProfileEducationInput(req.body);

    if (!isValid) {
      console.log(`isValid: ${isValid}`);
      return res.status(400).json(errors);
    }

    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {

        //Create new Education Object
        const newEducation = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          datefrom: req.body.datefrom,
          dateto: req.body.dateto,
          current: req.body.current,
          description: req.body.description
        };
        //Add to experienc array - at the beginning
        profile.education.unshift(newEducation);
        profile.save().then(profile => res.json(profile));
      });
  }
);

// @route DELETE api/profile/experience/:exp_id
// @desc Delete experience from user profile
// @access Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);
        //splice out of our array
        profile.experience.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/profile/education/:exp_id
// @desc Delete education from user profile
// @access Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);
        //splice out of our array
        profile.education.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/profile/
// @desc Delete user and profile
// @access Private
router.delete(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Profile.findOneAndRemove({
      user: req.user.id
    }).then(() => {
      user
        .findOneAndRemove({
          _id: req.user.id
        })
        .then(() => res.status(200).json({
          success: true
        }));
    });
  }
);

module.exports = router;