const db = require('../services/dbServices');

async function readAll(id) {
    // using user_exercise table...
    // let sql = `
    //     SELECT * FROM exercise INNER JOIN user_exercise ON exercise.id = user_exercise.exercise_id AND user_exercise.user_id = ?;
    // `

    let sql = `
        SELECT * FROM exercise WHERE user_id = ?;
    `

    return await db.query(sql, [id]);
}

async function findById(id) {
    let sql = `
        SELECT * FROM exercise WHERE id = ?;
    `

    const exerciseArr = await db.query(sql, [id]);

    const exercise = exerciseArr[0]

    return exercise
}

async function create(userId, username, exerciseName, type, description, public) {
    let vals = [
        exerciseName,
        type ? type : null,
        description ? description : null,
        username,
        public ? public : false,
        userId
    ]

    let sql = `
            INSERT INTO exercise (name, type, description, author, public, user_id) values (?, ?, ?, ?, ?, ?);
        `
    const res = await db.query(sql, vals);

    // await addToUser(userId, res.insertId)

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