const UserService = require('../services/user-service');

exports.getAllUsers = async (req, res) => {
  try {
    const { status, sort } = req.query;
    const users = await UserService.getAllUsers(status, sort);

    return res.json(users);
  } catch (error) {
    
    return res.status(500).json({ error: error.message });
  }
};