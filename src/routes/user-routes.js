const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user-controller")
const UserService = require('../services/user-service');
const auth = require('../../middleware/authMiddleware');

const userService = new UserService();
const userControllerService = new UserControllerService(userService);

router.get('/users',auth, (req, res) => userControllerService.getAllUsers(req, res));
router.post('/users',auth, (req, res) => userControllerService.createUser(req, res));
router.put('/users/:id',auth, (req, res) => userControllerService.updateUser(req, res));
router.delete('/users/:id',auth, (req, res) => userControllerService.deleteUser(req, res));


module.exports = router;