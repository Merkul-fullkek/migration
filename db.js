const { Sequelize } = require('sequelize');
const config = require('./config/config.json').development;

const sequelize = new Sequelize('userpanel', 'daniil', 'agugih48', {
  host: '172.17.0.2',
  dialect: 'postgres'
});

// Проверка соединения
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
