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
    }
});

// collection part
const Questions = new mongoose.model("questions", Questionschema);

module.exports = Questions;