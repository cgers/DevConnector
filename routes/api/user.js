const express = require('express');
const router = express.Router();

// Note that test in this case will refer to /api/user/test
router.get('/test', (req, res) => res.json({
    msg: 'User works!',
    value: 'All clear!'
}));

module.exports = router;