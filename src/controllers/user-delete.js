const UserService = require('../services/user-service')

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId; 
    await UserService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};