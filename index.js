require('dotenv').config(); //load vars drom .env

const express = require('express'); //import express

const mongoose = require('mongoose'); //mongoose library to interact with MongoDB

const getDBStatus = require("./utils/dbStatus.js"); //DataBase status file
const SensorsData = require('./models/SensorData.js'); // import sensor data model

const app = express(); //create an express app
let dbConnected = false; // store connection status

app.use(express.static("public")); //uses the frontend from /public

app.get("/db-status", (req, res) =>{
  const status = getDBStatus();
  res.json(status);
});

app.get("/api/latest", async (req, res) => {
  const latest = await SensorsData.findOne().sort({ timestamp: -1 });
  res.json(latest);
});

app.get("/api/history", async (req, res) => {
  const history = await SensorsData.find().sort({ readingTime: -1 }).limit(50);
  res.json(history);
});

// Try to connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB Atlas');
    dbConnected = true; // set to true when connected
})
.catch(err => {
    console.error('Connection ERROR with MongoDB:', err);
    dbConnected = false; // stay false if failed
});
  

// Homepage route
app.get('/', (req, res) => {
  if (dbConnected) {
    res.send('The Server is Runinng! AND \n MongoDB connection is working!');
  } else {
    res.send('The Server itself is Runinng! BUT \n MongoDB connection failed.');
  }
});


// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000, here\'s the link http://localhost:3000');
});