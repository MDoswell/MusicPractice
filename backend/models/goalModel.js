const db = require('../services/dbServices');

// CREATE TABLE goals (
//     ID int NOT NULL AUTO_INCREMENT,
//     goal_text VARCHAR(255),
//     create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY(ID)
// );

async function readAll() {
    let sql = `
        SELECT * FROM goals;
    `

    return await db.query(sql);
}

async function read() {
    let sql = `
        SELECT * FROM goals WHERE ID = 3;
    `

    return await db.query(sql);
}

async function create(text) {
    let sql = `
        INSERT INTO goals (goal_text) values (?);
    `

    return await db.query(sql, [text]);
}

async function update(id, text) {
    let sql = `
        UPDATE goals SET goal_text = ?, update_time = CURRENT_TIMESTAMP WHERE ID = ?;
    `

    return await db.query(sql, [text, id]);
}

async function remove(id) {
    let sql = `
        DELETE FROM goals WHERE ID = ?;
    `

    return await db.query(sql, [id]);
}

module.exports = {
    readAll,
    read,
    create,
    update,
    remove
};