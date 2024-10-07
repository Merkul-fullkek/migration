const UserService = require('../services/user-service')
exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await UserService.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};