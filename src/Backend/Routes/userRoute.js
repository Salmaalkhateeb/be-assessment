const express = require("express");
const route = express.Router();
const userController = require("../Controllers/userController");
require('dotenv').config();

route.post("/create", userController.createUser);
route.post("/read", userController.getUserInfo);
route.post("/delete", userController.deleteUser);


module.exports = route;