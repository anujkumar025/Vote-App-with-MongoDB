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
const Loginschema = new mongoose.Schema({
    fname: {
        type:String,
        required: true
    },
    // lname: {
    //     type:String,
    //     required: true
    // },
    email: {
        type:String,
        requried: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const collection = new mongoose.model("users", Loginschema);

module.exports = collection;