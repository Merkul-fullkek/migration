const { Users } = require('../models');

exports.updateUser = async (req, res) => {
  try {
    const {firstName, status} = req.body;
    if (!firstName) {
      return res.status(400).json({ error: 'firstName is required' });
    }

    if (status && status !== 'active' && status !== 'inactive') {
      return res.status(400).json({ error: 'Invalid status value. Must be "active" or "inactive".' });
    }

    const [updated] = await Users.update(req.body, {
      where: { id: req.params.userId }
    });
    if (!updated) {
     return res.status(404).json({error: 'User not found!'})
    };
     const updatedUser = await Users.findOne({ where: { id: req.params.userId } });
      return res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};