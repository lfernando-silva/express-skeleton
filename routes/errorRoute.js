const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
    return next(new Error(JSON.stringify({message: "Some Uncaught Error"})))
});

module.exports = router;