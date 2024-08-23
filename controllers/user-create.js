const { Users } = require('../models');

exports.createUser = async (req, res) => {
  try {
    const user = await Users.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};