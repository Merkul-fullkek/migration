const express = require('express');
const router = express.Router();
const getAllUsersController = require('../controllers/get-users');
const updateUserController = require('../controllers/update-user');
const createUserController = require('../controllers/user-create');
const deleteUserController = require('../controllers/user-delete');
const auth = require('../middleware/authMiddleware');

router.post('/users',auth, createUserController.createUser);
router.get('/users',auth, getAllUsersController.getAllUsers);
router.put('/users/:userId',auth, updateUserController.updateUser);
router.delete('/users/:userId',auth, deleteUserController.deleteUser);

module.exports = router;