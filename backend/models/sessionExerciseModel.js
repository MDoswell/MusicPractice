const db = require('../services/dbServices');

async function readAll(sessionId) {
    let sql = `
        SELECT * FROM exercise INNER JOIN session_exercise 
        ON exercise.id = session_exercise.exercise_id 
        AND session_id = ?;
    `

    const session = await checkSession(sessionId)
    const exercises = await db.query(sql, [sessionId]);

    return { session, exercises }
}

async function checkSession(sessionId) {
    let sql = `
        SELECT * FROM session WHERE id = ?;
    `

    const session = await db.query(sql, [sessionId])

    return session[0]
}

async function findById(sessionId, exerciseId) {
    let sql = `
        SELECT * FROM session_exercise WHERE session_id = ? AND exercise_id = ?;
    `
}

async function create(sessionId, exerciseId, position, duration, notes) {
    let vals = [
        sessionId,
        exerciseId,
        position,
        duration,
        notes,
        false  // exercise not completed by default
    ]

    let sql = `
            INSERT INTO session_exercise (session_id, exercise_id, position, duration, notes, completed) 
            VALUES (?, ?, ?, ?, ?, ?);
        `
    const exercise = await db.query(sql, vals);

    // await addToUser(userId, res.insertId)

    // const exercise = findById(res.insertId)

    return exercise
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
    checkSession,
    create,
    update,
    remove
};