const express = require ('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');

// USER
router.get('/profile', auth.checkAuth, users.profile);
router.post('/users', users.create);
router.get('/login', users.login);


// LIST
// TASK
module.exports = router;