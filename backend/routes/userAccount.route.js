const express = require('express');
const router = express.Router();
const userAccountController = require('../controllers/userAccount.controller');
const auth = require('../middleware/auth');

router.post('/login', (req, res) => userAccountController.login(req, res));
router.get('/renewToken', auth.supplier, (req, res) => userAccountController.renewToken(req, res));

module.exports = router;
