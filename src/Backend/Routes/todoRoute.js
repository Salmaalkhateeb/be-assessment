const express = require("express");
const route = express.Router();
const todoController = require("../Controllers/todoController");
require('dotenv').config();

route.post("/create", todoController.createTodo);
route.post("/update", todoController.updateTodo);
route.post("/delete", todoController.deleteTodo);
route.post("/read", todoController.getTodo);



module.exports = route;