require('dotenv').config();  
const Sequelize = require('sequelize');


console.log("DB_PASSWORD:", process.env.DB_PASSWORD);


const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, String(process.env.DB_PASSWORD), {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
      logging: console.log,  
    });


sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;