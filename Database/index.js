const { Sequelize } = require('sequelize')
	
const sequelize = new Sequelize('myDBName', 'myUsername', 'myPassword', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});