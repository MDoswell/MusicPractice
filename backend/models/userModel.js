const db = require('../services/dbServices');

// CREATE TABLE user (
//     ID int NOT NULL AUTO_INCREMENT,
//     user_name VARCHAR(100) NOT NULL,
//     email VARCHAR(100) NOT NULL,
//     password VARCHAR(100),
//     create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY(ID),
//     UNIQUE(user_name),
//     UNIQUE(email)
// );

async function findOne(field, value, includePass = false) {
    let sql = `
        SELECT * FROM user WHERE ${field} = ?;
    `

    const userArr = await db.query(sql, [value]);
    const user = userArr[0];

    if (user) {
        if (includePass) {
            return { id: user.ID, name: user.user_name, email: user.email, password: user.password }    
        } else {
            return { id: user.ID, name: user.user_name, email: user.email }
        }
    } else {
        return
    }
}

async function create(name, email, hashedPassword) {
    let sql = `
        INSERT INTO user (user_name, email, password) values (?, ?, ?);
    `

    const user = await db.query(sql, [name, email, hashedPassword]);
    //const userId = user.insertId;

    return { id: user.insertId, name: name, email: email }
}


module.exports = {
    findOne,
    create
}
