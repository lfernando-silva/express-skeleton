const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    return res.status(200).json({
        authenticated: true,
        running: true,
        timestamp: new Date().getTime()
    })
});

module.exports = router;