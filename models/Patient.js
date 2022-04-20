const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  patient: { type: String },
  phone: { type: String },
  address: { type: String },
  location: { type: String },
});

const Patient = mongoose.model("patient", patientSchema);
module.exports = Patient;
