const express = require("express");
const app = express();
const port = 3000;
let data = require("./data.json"); 


function getTodos(req, res) {    
    //CREATE A NEW RESPONSE WITH THE CURRENT DATA OBJECT TO BE RETURNED
    let response = { todos: data };
    
    //RETURN THE RESPONSE TO USER
        res.send(response);
        // res.send("Hello World");
}


app.get("/", getTodos);

function appStart(){
    console.log("To-Do-Api listening at " + port);
}
app.listen(port, appStart);
