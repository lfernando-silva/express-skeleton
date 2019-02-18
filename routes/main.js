const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(15); //Greater the number, slower is the hashing and compare

// Fake In mem DB
let DB_USER = null;

const saveInDB = (newUser) => {
    DB_USER = {...newUser}
    return newUser;
}

const findInDB = (username) => {
    if(DB_USER && DB_USER.username === username) return DB_USER;
    return null;
}

router.get('/', async (req, res) => {
    return res.status(200).json({
        running: true,
        timestamp: new Date().getTime()
    })
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const user = findInDB(username);

    if(!user || !bcrypt.compareSync(password, user.password)) return res.status(401).json({message: 'invalid credentials'});

    return res.status(201).json({
        token: jwt.sign({
            username: user.username,
            name: user.name,
        }, process.env.JWT_SECRET, { expiresIn: '1h' })
    })
})
;
router.post('/signup', async (req, res) => {
    const {username, password, name} = req.body;
    const user = saveInDB({username, password: bcrypt.hashSync(password, salt), name});
    delete user.password;
    return res.status(201).json(user)
})

module.exports = router;