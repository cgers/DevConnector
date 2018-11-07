const express = require('express');
const router = express.Router();

//Note that test in this case will refer to /api/profile/test
// @route GET api/profile/test 
// @desc Test post route
// @access Public
router.get('/test', (req, res) => res.json({
    msg: 'Profile works!'
}));

module.exports = router;