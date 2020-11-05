const express = require("express");
const app = express();
const port = 3000;
let dataObj = require("./data.json"); 
app.use(express.json());

function getTodos(req, res) {
    //GET THE DATA FROM THE FILE
        let data = dataObj;
    
    //CREATE A NEW RESPONSE WITH THE CURRENT DATA OBJECT TO BE RETURNED
    let response = { todos: data };
    
    //RETURN THE RESPONSE TO USER
        res.send(response);
        // res.send("Hello World");
    }

function addTodo(req, res) {
    //GET THE DATA FROM THE FILE
        let data = dataObj;

    //GET ALL THE ID'S FROM DATA ARRAY
        let allIds = data.map(function (todo) {
            return todo.id;
    });

    //GET THE LAST OR MAX ID FROM ALL ID'S & INCREMENT IT BY 1   
        let maxId = Math.max.apply(Math, allIds) + 1;

    //CREATING A NEW TODO OBJECT TO BE INSERTED IN THE DATA ARRAY
        let newTodo = {
            completed: req.body.completed,
            id: maxId,
            name: req.body.name,
        };

    //ADD THE NEW TODO IN YOUR DATA ARRAY
        data.push(newTodo);

    //CREAT A NEW ESPONSE WITH THE CURRENT DATA OBJECT TO BE RETURNED
        let response = { todos: dataObj };

//RETURN THE RESPOINSE TO THE USER
        res.send(response);
    }


function updateToDo(req, res) {
//GET THE DATA FROM THE FILE
      let data = dataObj;

//GET ALL THE ID'S FROM THE DATA ARRAY
       let ifExists = data.some(function (todo) {
//CHECK IF THE ID MATCH WITH THE ID USER PROVIDED TO UPDATE
          if (todo.id === req.body.id) {
            return todo;
    }
});
//CHECK IF ELEMENT DOES EXISTS OR NOT
//if (ifExists ===false0{
    if (!ifExists) { //ELEMENT DOES NOT EXIST
//CREATE A NEW RESPONSE WITH THE CURRENT DATA OBJECT TO BE RETURNED
        let response = { message: "Element DOES NOT exists. this is line 64"};

//RETURN THE RESPONSE TO USER
        res.send(response);
    } else {
//ELEMENT EXISTS 

//GET ALL THE ID'S FROM THE DATA ARRAY
        let newData = data.map(function (todo) {
//CHECK IF THE ID MATCH WITH THE ID USER PROFICED TO UDPATE
            if (todo.id === req.body.id) {
//UPDATE THE LEMENTS WITH NEW DATA PROVIDED BY THE USER
                todo.name = req.body.name;
                todo.completed = req.body.completed;
            }
            return todo;
        });
// ASSIGN THE ACTUAL DATA OBJECT WITH NEW DATA OBJECT
        dataObj = newData;

 //CREAT A NEW RESPOSE WITH THE CURRENT DATA OBJECT TO BE RETURNED
    let response = { todo: dataObj};

 //RETURN THE RESPONSE TO USER
        res.send(response);
     } 
    }



function deleteTodo(req, res) {
//GET THE DATA FROM THE FILE
    let data = dataObj;

//CHECK IF THE ELEMENT EXISTS IN THE ARRAY
    let ifExists = data.some(function (todo) {

//CHECK IF THE ID MATCHES WITH THE ID USER PROVIDED TO UPDATE
        if (todo.id === req.body.id) {
            return todo;
        }
    });

//CHECK IF ELEMENT DOES EXISTS OR NOT
//if (ifExists ===false0{
    if (!ifExists) { //ELEMENT DOES NOT EXIST

//CREATE A NEW RESPONSE WITH THE CURRENT DATA OBJECT TO BE RETURNED
    let response = { message: "To Do does not exists." };

//RETURN THE RESPONSE TO USER
        res.send(response);
    } else {
        //ELEMENT EXISTS 


    let newData = data.filter(function (todo) {
//CHECK IF THE ID MATCH WITH THE ID USER PROFICED TO UDPATE
        if (todo.id !== req.body.id) {
//RETURN THE TODO IF IT DOES NOT ESISITS
            return todo;
        }
      });

//      let newData = data.map(function (todo) {
// //CHECK IF THE ID MATCH WITH THE ID USER PROFICED TO UDPATE
//           if (todo.id === req.body.id) {
// //UPDATE THE LEMENTS WITH NEW DATA PROVIDED BY THE USER
//             todo.name = req.body.name;
//             todo.completed = req.body.completed;
//         }
// //RETURN THE TODO IF IT DOES NOT ESISITS
//         return todo;
//     });

//ASSIGN THE ACTUAL DATA OBJECT WITH NEW DATA OBJECT
      dataObj = newData;

//CREAT A NEW RESPONSE WITH THE NEW DATA OBJECT TO BE RETURNED
      let response = { todos: dataObj };
    
//RETURN THE RESPONSE TO USER
        res.send(response);
        } 
    }


//CRUD
app.get("/todo", getTodos);
app.post("/todo", addTodo);
app.put("/todo", updateToDo);
app.delete("/todo", deleteTodo);

// function reqGetUser(req, res) {
//     let name = req.query.name;
//     let country = req.query.country;
//     let response = {name: name, country: country };
//     res.send(response);
// }
// app.get("/", reqGet);                     // ***slash mean default
// app.get("/user", reqGetUser);


function appStart(){
    console.log("To-Do-Api listening at " + port);
}
app.listen(port, appStart);
