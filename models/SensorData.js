//Defining a Sensor Data Model

// Import mongoose
const mongoose = require('mongoose');

// Define the structure (schema) of your sensor data
const sensorSchema = new mongoose.Schema({
  motor1: String,
  motor2: String,
  LDR: String,
  temp: Number,
  hum: Number,
  RFID: String,
  gas: String,
  PIR: Number,
  readingTime: {type: Date, default: Date.now}
});


// EXPORT THE REAL MONGOOSE SensorData MODEL
module.exports = mongoose.model("SensorsData", sensorSchema);
