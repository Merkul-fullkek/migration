const { Users } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const { status, sort } = req.query;

    if (status && status !== 'active' && status !== 'inactive') {
      return res.status(400).json({ error: 'Invalid status value. Must be "active" or "inactive".' });
    }

    let whereFilter = {};
    if (status) {
      whereFilter.status = status;
    }

    let orderAlph = [];
    if (sort === 'ASC') {
      orderClause.push(['firstName', 'ASC']);
    }

    const users = await Users.findAll({
      where: whereFilter,
      order: orderAlph
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};