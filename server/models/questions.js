const mongoose = require('mongoose');
// const mongodb = require('require');
const config = require('dotenv').config();

const DATABASE = process.env.DATABASE;

const connect = mongoose.connect(DATABASE);


connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch((err) => {
    console.log(err);
})

// Create Schema
const Questionschema = new mongoose.Schema({
    question: {
        type:String,
        required: true
    },
    options:{
        type: Array,
        required:true
    },
    correctOption:{
        type: Number,
        required:true
    },
    electionId:{
        type:String,
        required:true
    },
    peopleWhoChoseRight:{
        type:Number
    },
    peopleWhoAttempted:{
        type:Number
    }
});

// collection part
const Questions = new mongoose.model("questions", Questionschema);

module.exports = Questions;