const db = require('../services/dbServices');

async function readAll(id) {
    let sql = `
        SELECT * FROM exercise INNER JOIN user_exercise ON exercise.id = user_exercise.exercise_id AND user_exercise.user_id = ?;
    `

    return await db.query(sql, [id]);
}

async function findById(id, userId) {
    let sql = `
        SELECT * FROM exercise WHERE id = ?;
    `

    const exerciseArr = await db.query(sql, [id]);

    const exercise = exerciseArr[0]
    exercise.user_id = userId

    return exercise
}

async function create(userId, name, type, description) {
    let sql = `
            INSERT INTO exercise (name, type, description) values (?, ?, ?);
        `
    const res = await db.query(sql, [name, type, description]);

    await addToUser(userId, res.insertId)

    const exercise = findById(res.insertId)

    return exercise
}

async function addToUser(userId, exerciseId) {
    sql = `
        INSERT INTO user_exercise (user_id, exercise_id) values (?, ?)    
    `

    await db.query(sql, [userId, exerciseId])
}

async function update(id, name, type, description) {
    let sql = `
        UPDATE exercise 
        SET name = ?, type = ?, description = ? 
        WHERE id = ?;
    
    `

    return await db.query(sql, [name, type, description, id]);
}

async function remove(id) {
    let sql = `
        DELETE FROM exercise WHERE id = ?;
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