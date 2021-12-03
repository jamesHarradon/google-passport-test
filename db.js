const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT
}

const prodConfig = {
    //for use with heroku
}

//const pool = new Pool(process.env.NODE_ENV = 'production' ? prodConfig : devConfig);
const pool = new Pool(devConfig);

module.exports = pool;