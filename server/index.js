const express = require("express");
const app = express();
const cors=require("cors");
const pool = require("./db");



//middleware
app.use(cors());
app.use(express.json());

//creates a cmd
app.post("/cmd", async (req, res) => {
    try{
        const {cmd, description} =req.body;
        const newCmd = await pool.query(
            "INSERT INTO clitable(cmd, description) VALUES($1, $2) RETURNING *",
            [cmd,description]
        );
        res.json(newCmd.rows[0]);
    } catch (err) {
    console.error(err.message);  
    } 
});

//get all cmd
app.get("/cmd", async (req,res)=>{
    try {
        const allCmd= await pool.query("SELECT * FROM clitable");
        res.json(allCmd.rows)      
    } catch (err) {
        console.error(err.message);        
    }
});

// get a cmd
app.get("/cmd/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const cli_cmd= await pool.query("SELECT * FROM clitable WHERE cliTable_id=$1",
        [id]
        );      
        res.json(cli_cmd.rows[0]);  
    } catch (err) {
        console.error(err.message);  
    }
});


//update a cmd
app.put("/cmd/:id", async(req,res)=>{
    try {
        const {id}=req.params;
        const {cmd,description}=req.body;
        const updateCmd=await pool.query(
            "UPDATE clitable SET cmd=$1, description=$2 WHERE clitable_id=$3",
            [cmd,description,id]
        );
        res.json("cmd was updated!");        
    } catch (err) {
        console.error(err.message);       
    }
});

//delete a cmd
app.delete("/cmd/:id", async(req,res)=>{
    try {
        const {id}=req.params;
        const deleteCmd= await pool.query(
            "DELETE FROM clitable WHERE clitable_id=$1",
            [id]
        );
        res.json("cmd was deleted");
    } catch (err) {
        console.error(err.message);
        
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
});