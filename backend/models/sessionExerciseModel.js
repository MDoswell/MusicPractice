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

async function findById(sessionId, exerciseId, position) {
    let sql = `
        SELECT * FROM exercise INNER JOIN session_exercise 
        ON exercise.id = session_exercise.exercise_id
        WHERE session_id = ? AND exercise_id = ? AND position = ?;
    `
    const exerciseArr = await db.query(sql, [sessionId, exerciseId, position]);

    const exercise = exerciseArr[0]

    return exercise
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

    console.log('querying...')
    const exercise = await db.query(sql, vals);

    // await addToUser(userId, res.insertId)

    // const exercise = findById(res.insertId)

    return exercise
}

async function update(sessionId, exerciseId, position, duration, notes, completed) {
    let vals = [duration, notes, completed, sessionId, exerciseId, position]

    let sql = `
        UPDATE session_exercise 
        SET duration = ?, notes = ?, completed = ? 
        WHERE session_id = ? AND exercise_id = ? AND position = ?;
    
    `

    return await db.query(sql, vals);
}

// Updating positions:
// UPDATE session_exercise 
//      SET position = CASE
//          WHEN position < 3 THEN position 
//          WHEN position = 3 THEN 20 
//          WHEN position > 3 WHEN position+1 
//      END
// WHERE session_id = 2;

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
    findById,
    update,
    remove
};