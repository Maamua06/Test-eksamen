const { Router } = require('express');
const { loginUser, signupUser} = require('../controller/userController');

const router = Router();

// Login route
router.post('/login', loginUser)


// Signup route
router.post('/signup', signupUser)

module.exports = router;