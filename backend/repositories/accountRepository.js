const database = require('../db/database')

async function checkEmailUnique(email) {
    try {
        const result = await database.db.oneOrNone('SELECT id_account FROM account WHERE email = $1', [email]);
        return !!result;
    } catch (e) {
        console.log("DATABASE checkEmailUnique ERROR: " + e);
    }
    return false;
}

async function register(data) {
    database.db.tx( async t => {
        const account = await t.one(`INSERT INTO account (email, password, name) VALUES ($1, $2, $3) RETURNING id_account`,
            [data.email, data.password, data.name]);
    }).catch( err => {
        console.log("DATABASE register ERROR: " + err)
        throw err
    })
}

async function getAccountByEmail(email) {
    try {
        return await database.db.oneOrNone('SELECT * FROM account WHERE email = $1', [email])
    } catch(e) {
        console.log("DATABASE getAccountByEmail ERROR: " + e)
        throw e
    }

}

async function getAccountById(id) {
    try {
        return await database.db.oneOrNone('SELECT * FROM account WHERE id_account = $1', [id])
    } catch(e) {
        console.log("DATABASE getAccountById ERROR: " + e)
        throw e
    }
}

module.exports = {
    checkEmailUnique,
    register,
    getAccountById,
    getAccountByEmail
}