const express = require('express')
const router = express.Router()

const { userLogin, createUser, getProfile, getLogout } = require('../controllers/userController2')

router.route('/login').post(userLogin)
router.route('/register').post(createUser)
router.route('/profile').get(getProfile)
router.route('/logout').get(getLogout)
module.exports = router;
