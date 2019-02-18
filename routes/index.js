const express = require('express')
const router = express.Router();

const main = require('./main');
const mainAuthenticated = require('./mainAuthenticated');
const errorRoute = require('./errorRoute')

const authenticationHandler = require('../middlewares/authenticationHandler')

router.use('/', main);
router.use('/error', errorRoute);

// Authenticated routes
router.use(authenticationHandler);
router.use('/authenticated', mainAuthenticated);

module.exports = router;