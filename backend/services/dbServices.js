const dbConfig = require('../config/db');
const mysql = require('mysql2/promise');

async function query(sql, params) {
    // Create connection
    const db = await mysql.createConnection(dbConfig);

    let [results] = await db.execute(sql, params);

    return results;
}

module.exports = {
    query
};
