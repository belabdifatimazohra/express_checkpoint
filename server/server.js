const express = require("express"); // Import express from "express"
const morgan = require('morgan');
require("dotenv").config(); //dotenv

const PORT = process.env.PORT || 2500; // listen to the port
const app = express(); // initialise the app

app.use(morgan("tiny"));
// middleware function in Express. It serves static files
app.use(express.static(__dirname + '/public'));


// Create a custom  middleware to verify the time of the request 
app.use(addActiveTime = (req, res, next) => {

    let requestAt = new Date().getHours();
    let day = new Date().getDay();
    if ((requestAt < 9) || (requestAt > 17) && ((day == 0) || (day == 6))) {
        res.sendFile(__dirname + '/public/Closed.html')

    }
    else {

        res.sendFile(__dirname + '/public/Home.html');
    }
})



app.use(express.static(__dirname + '/public'));
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})// listen to the port
