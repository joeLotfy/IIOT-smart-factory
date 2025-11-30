require('dotenv').config(); //load vars drom .env

const express = require('express'); //import express

const mongoose = require('mongoose'); //mongoose library to interact with MongoDB

const app = express(); //create an express app
let dbConnected = false; // store connection status

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