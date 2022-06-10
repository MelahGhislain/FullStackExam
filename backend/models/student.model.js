const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: true
    },
    matricule:{
        type: String,
        unique: true,
        required: true
    },
    status:{
        type: Number,

    },
    present:{
        type: Boolean,
    },
    attendance:[{ isPresent: Boolean, date: Date }]
},{timestamps: true})

module.exports = mongoose.model('student', taskSchema)