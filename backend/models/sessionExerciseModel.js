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

// async function create(sessionId, exerciseId, position, duration, notes) {
async function create(sessionId, sessionExercises) {
    let sql = `
        INSERT INTO session_exercise (session_id, exercise_id, position, duration, notes, completed)
        VALUES 
    `
    let vals = []

    console.log('session exercises (in model):', sessionExercises)

    sessionExercises.forEach((exercise, idx) => {
        sql += '(?, ?, ?, ?, ?, ?)'
        vals.push(
            sessionId, 
            exercise.exercise_id, 
            exercise.position,
            exercise.duration,
            exercise.notes,
            false // exercise not completed by default
        )

        if (idx < (sessionExercises.length - 1)) {
            sql += ', '
        }
    })

    // for (let i = 0; i < sessionExercises.length; i++) {
    //     sql += 'VALUES (?, ?, ?, ?, ?, ?)'
    //     vals.push(sessionId, )
    // }
    
    // let vals = [
    //     sessionId,
    //     exerciseId,
    //     position,
    //     duration,
    //     notes,
    //     false  // exercise not completed by default
    // ]

    sql += ';'

    console.log('query: ', sql)
    console.log('vals: ', vals)

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

async function updatePositions(sessionId, origPos, newPos) {
    console.log('orig', origPos)
    console.log('new', newPos)
    if (origPos == newPos) {
        return 'no change in positions'
    }

    let upper = Math.max(origPos, newPos)
    let lower = Math.min(origPos, newPos)
    let sign = origPos > newPos ? '+' : '-'

    let sql = `
        UPDATE session_exercise 
            SET position = CASE
                WHEN position = ${origPos} THEN ${newPos} 
                WHEN position < ${lower} THEN position 
                WHEN position >= ${lower} AND position <= ${upper} THEN position${sign}1
                WHEN position > ${upper} THEN position
            END
        WHERE session_id = ?;
    `

    await db.query(sql, [sessionId]);

    let newExerciseArr = await readAll(sessionId);

    return newExerciseArr.exercises
}

// Updating positions:
// UPDATE session_exercise 
//      SET position = CASE
//          WHEN position = (target) THEN (newPos) 
//          WHEN position < (target) THEN position 
//          WHEN position > (target) AND position <= (newPos) THEN position-1
//          WHEN position > (newPos) THEN position
//      END
// WHERE session_id = 2;

// UPDATE session_exercise 
//      SET position = CASE
//          WHEN position = (target) THEN (newPos) 
//          WHEN position < (newPos) THEN position 
//          WHEN position >= (newPos) AND position < (target) THEN position+1
//          WHEN position > (target) THEN position
//      END
// WHERE session_id = 2;

// UPDATE session_exercise 
//      SET position = CASE
//          WHEN position = 2 THEN 3 
//          WHEN position < 2 THEN position 
//          WHEN position >= 2 AND position <= 3 THEN position-1
//          WHEN position > 3 THEN position
//      END
// WHERE session_id = 2;

// UPDATE session_exercise 
//      SET position = CASE
//          WHEN position = 2 THEN 1 
//          WHEN position < 1 THEN position 
//          WHEN position >= 1 AND position <= 2 THEN position+1
//          WHEN position > 2 THEN position
//      END
// WHERE session_id = 2;

// UPDATE session_exercise 
//      SET position = CASE
//          WHEN position = 1 THEN 4 
//          WHEN position < 1 THEN position 
//          WHEN position >= 1 AND position <= 4 THEN position-1
//          WHEN position > 4 THEN position
//      END
// WHERE session_id = 2;

async function remove(sessionId, exerciseId, position) {
    vals = [sessionId, exerciseId, position]
    
    let sql = `
        DELETE FROM session_exercise 
        WHERE session_id = ? AND exercise_id = ? AND position = ?;
    `

    return await db.query(sql, vals);
}

module.exports = {
    readAll,
    checkSession,
    create,
    findById,
    update,
    updatePositions,
    remove
};