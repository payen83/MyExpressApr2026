const mysql = require('mysql2/promise');

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'FErd1983~!',
    database: 'mymahirapr26',
});

(async () => {
    try{
        const connection = await database.getConnection();
        console.log('Connected to MYSQL database.');
        connection.release();

    }catch(err) {
        console.error('Database connection failed');
    }
});

module.exports = database;