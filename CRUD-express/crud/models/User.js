// models/User.js
const { mongoose } = require('../config/database');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    // You can add other fields like email, registrationDate, etc.
});

const User = mongoose.model('User', userSchema);

module.exports = User;