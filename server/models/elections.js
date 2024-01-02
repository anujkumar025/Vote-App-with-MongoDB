const mongoose = require('mongoose');
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
const Electionschema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type:String,
        // required: true
    },
    date: {
        type:Date,
        required: true
    },
    public1: {
        type:Boolean,
        required: true
    },
    userEmail: {
        type:String,
        required: true
    }
});

// collection part
const Election = new mongoose.model("elections", Electionschema);

module.exports = Election;