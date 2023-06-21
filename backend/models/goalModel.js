const db = require('./dbServices');

const goalSchema = `INSERT INTO goals (goal_text) values (?);`;

async function getGoals() {
    let sql = `
        SELECT * FROM goals;
    `
    let result = await db.query(sql);

    console.log(result);
    return result;
}

module.exports = {
    getGoals
};