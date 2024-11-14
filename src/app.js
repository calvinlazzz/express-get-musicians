const express = require("express");
const app = express();
const  Musician  = require("../models/index")
const  db  = require("../db/connection")
const router = require('../routes/musicians');
const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 
app.use(express.json());
app.use('/musicians', router);
// app.get('/', (req, res) => {
//     res.send('Server is running');
// });


module.exports = app;