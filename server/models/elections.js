const mongoose = require('mongoose');
// const mongodb = require('require');
const connect = mongoose.connect("mongodb+srv://adminff:8V5bFMHTg33XTB6e@cluster10.tqumzrc.mongodb.net/?retryWrites=true&w=majority");


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