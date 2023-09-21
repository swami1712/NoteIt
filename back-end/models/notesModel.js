const mongoose = require('../database/db')

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
})

module.exports = mongoose.model('Note', notesSchema)