const db = require('../services/dbServices');

// CREATE TABLE goal (
//     ID int NOT NULL AUTO_INCREMENT,
//     user_id int NOT NULL,
//     goal_text VARCHAR(255),
//     create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY(ID),
//     FOREIGN KEY(user_id) REFERENCES user(ID) ON UPDATE CASCADE ON DELETE CASCADE
// );

async function readAll(id) {
    let sql = `
        SELECT * FROM goal WHERE user_id = ?;
    `

    return await db.query(sql, [id]);
}

async function findById(id) {
    let sql = `
        SELECT * FROM goal WHERE ID = ?;
    `

    const goalArr = await db.query(sql, [id]);

    return goalArr[0];
}

async function create(id, text) {
    let sql = `
        INSERT INTO goal (user_id, goal_text) values (?, ?);
    `

    const res = await db.query(sql, [id, text]);

    const goal = findById(res.insertId)

    return goal
}

async function update(id, text) {
    let sql = `
        UPDATE goal SET goal_text = ?, update_time = CURRENT_TIMESTAMP WHERE ID = ?;
    `

    return await db.query(sql, [text, id]);
}

async function remove(id) {
    let sql = `
        DELETE FROM goal WHERE ID = ?;
    `

    return await db.query(sql, [id]);
}

module.exports = {
    readAll,
    findById,
    create,
    update,
    remove
};