const db = require('../services/dbServices');

// CREATE TABLE goal (
//     id int NOT NULL AUTO_INCREMENT,
//     user_id int NOT NULL,
//     goal_text VARCHAR(255),
//     create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY(id),
//     FOREIGN KEY(user_id) REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE
// );

async function readAll(id) {
    let sql = `
        SELECT * FROM session WHERE user_id = ?;
    `

    return await db.query(sql, [id]);
}

async function findById(id) {
    let sql = `
        SELECT * FROM session WHERE id = ?;
    `

    const goalArr = await db.query(sql, [id]);

    return goalArr[0];
}

async function create(id, name) {
    if (name) {
        let sql = `
            INSERT INTO session (user_id, name, completed) values (?, ?, false);
        `
        const res = await db.query(sql, [id, name]);

        const goal = findById(res.insertId)

        return goal
    } else {
        let sql = `
            INSERT INTO session (user_id, completed) values (?, false);
        `
        const res = await db.query(sql, [id]);

        const goal = findById(res.insertId)

        return goal
    }


}

async function update(id, name, completed) {
    let sql = `
        UPDATE session SET name = ?, completed = ? WHERE id = ?;
    `

    return await db.query(sql, [name, completed, id]);
}

async function remove(id) {
    let sql = `
        DELETE FROM session WHERE id = ?;
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