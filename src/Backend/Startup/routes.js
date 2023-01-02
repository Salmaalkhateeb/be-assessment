const express = require('express');
const userRoute = require('../Routes/userRoute');
const todoRoute = require('../Routes/todoRoute');


module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false , limit : '20mb' }));
    app.use('/User', userRoute); 
    app.use('/Todo', todoRoute); 

};