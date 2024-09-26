const { Users } = require('../models');

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await Users.destroy({
      where: { id: req.params.userId }
    });
    if (!deleted) {
        return res.status(404).json({error: 'User not found'})
    }
     return res.status(204).send("User deleted");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};