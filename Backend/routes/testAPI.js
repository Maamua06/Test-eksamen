const { Router } = require('express');
const { createToken } = require('../controller/userController');

const router = Router();

router.get('/testAPI', createToken);


module.exports = router;