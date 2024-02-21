import dotenv from 'dotenv'; 
const { Sequelize } = require('sequelize');

dotenv.config();
const hostname:any = process.env.DB_HOST;
const dbuser:any = process.env.DB_USER;
const dbpassword:any = process.env.DB_PASSWORD;
const dbname:any = process.env.DB_NAME;
const environment:any = process.env.NODE_ENV;

let sequelize:typeof Sequelize;

const setEnvironment:any = {
  development: () => new Sequelize('sqlite::memory:', { logging: false }),
  // development: () => new Sequelize({
  //   dialect: 'sqlite',
  //   storage: 'db/hoa.sqlite',
  //   logging: false
  // }),
  production: () => new Sequelize(dbname, dbuser, dbpassword, {
    dialect: 'postgres',
    logging: false
  })
}

sequelize = setEnvironment[environment]();
sequelize.sync();

export default sequelize;