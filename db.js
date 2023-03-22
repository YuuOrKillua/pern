const Pool = require('pg').Pool

const pool = new Pool ({
    user: "postgres",
    password: "admin",
    port: 5432,
    database: "pern"
})

module.exports = pool
