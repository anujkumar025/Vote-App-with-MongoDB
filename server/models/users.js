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