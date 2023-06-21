const db = require('./dbServices');

async function getGoals() {
    let sql = `
        SELECT * FROM goals;
    `

    return await db.query(sql);
}

async function getGoal() {
    let sql = `
        SELECT * FROM goals WHERE ID = 3;
    `

    return await db.query(sql);
}

async function setGoal(text) {
    let sql = `
        INSERT INTO goals (goal_text) values (?);
    `

    return await db.query(sql, [text]);
}

async function updateGoal(id, text) {
    let sql = `
        UPDATE goals SET goal_text = ?, update_time = CURRENT_TIMESTAMP WHERE ID = ?;
    `

    return await db.query(sql, [text, id]);
}

async function deleteGoal(id) {
    let sql = `
        DELETE FROM goals WHERE ID = ?;
    `

    return await db.query(sql, [id]);
}

module.exports = {
    getGoals,
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal
};