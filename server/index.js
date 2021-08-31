const express = require("express");
const app = express();
const cors=require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json());

//creates a cli-commands
app.post("/cli", async (req, res) => {
    try{
        const {cmd, description} =req.body;
        const newCmd = await pool.query(
            'INSERT INTO clitable(cmd, description) VALUES($1, $2) RETURNING *',
            [cmd,description]
        );
        res.json(newCmd);
    } catch (err) {
    console.error(err.message);  
    } 
});



app.listen(3000, () => {
    console.log("server has started on port 3000");
});