const mongoose = require('../database/db')
// Student Model
const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "your name is required"]
        },
        email:
        {
            type: String,
            // required: [true, "your email is required"],
            unique: true
        },
        password:
        {
            type: String,
            unique: true
        },
        date:
        {
            type: Date,
            default: new Date()
        }
    }
);


module.exports = mongoose.model('Student', studentSchema);