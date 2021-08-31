//configures how we connect to our database
const { Pool } = require("pg");

const pool =new Pool({
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    host:"localhost",
    port:4000,
    database:"cli_commands"
});

module.exports=pool;