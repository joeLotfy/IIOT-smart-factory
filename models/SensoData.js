//Defining a Sensor Data Model

// Import mongoose
const mongoose = require('mongoose');

// Define the structure (schema) of your sensor data
const sensorSchema = new mongoose.Schema({
  sensorType: String,   // e.g. "temperature", "gas", "humidity"
  value: Number,        // numeric reading from the sensor
  timestamp: {          // when the reading was taken
    type: Date,
    default: Date.now
  },
  status: Bool,
});

module.exports = ("sensorDaya", sensorSchema);