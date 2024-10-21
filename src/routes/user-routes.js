const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user-controller")
const UserService = require('../services/user-service');
const auth = require('../middleware/authMiddleware');

const userService = new UserService();
const userControllerService = new UserController(userService);

 router.get('',auth,(req, res, next) => userControllerService.getAllUsers(req, res, next));
 router.post('',auth, (req, res) => userControllerService.createUser(req, res));
 router.put('/:id',auth, (req, res, next) => userControllerService.updateUser(req, res, next));
 router.delete('/:id',auth, (req, res) => userControllerService.deleteUser(req, res));


module.exports = router;