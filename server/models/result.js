const mongoose = require('mongoose');
const config = require('dotenv').config();

const DATABASE = process.env.DATABASE;

// const mongodb = require('require');
const connect = mongoose.connect(DATABASE);


connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch((err) => {
    console.log(err);
})

// Create Schema
const ResultSchema = new mongoose.Schema({
    quiz_id: {
        type:String,
        required: true
    },
    ques_id: {
        type:Array,
        required: true
    },
    email: {
        type:String,
        requried: true
    },
    isCorrect:{
        type:Array
    },
    chosenOption:{
        type:Array
    },
});

// collection part
const collection = new mongoose.model("results", ResultSchema);

module.exports = collection;