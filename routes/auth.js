const router = require('express').Router();
const userController = require('../controllers/account/user')

router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);


module.exports = router;