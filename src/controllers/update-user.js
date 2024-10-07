const UserService = require('../services/user-service');

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Убедитесь, что id передается корректно
    const userData = req.body;
    const user = await UserService.updateUser(userId, userData);
    
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};