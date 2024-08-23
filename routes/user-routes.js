const express = require('express');
const router = express.Router();
const getAllUsersController = require('../controllers/get-users');
const updateUserController = require('../controllers/update-user');
const createUserController = require('../controllers/user-create');
const deleteUserController = require('../controllers/user-delete')

router.post('/users', createUserController.createUser);
router.get('/users', getAllUsersController.getAllUsers);
router.put('/users/:userId', updateUserController.updateUser);
router.delete('/users/:userId', deleteUserController.deleteUser);

module.exports = router;