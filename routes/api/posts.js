const express = require('express');
const router = express.Router();

//Note that test in this case will refer to /api/posts/test
router.get('/test', (req, res) => res.json({
    msg: 'Posts works! '
}));

module.exports = router;