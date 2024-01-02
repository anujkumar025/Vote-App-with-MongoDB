const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require('./models/users');
const Election = require('./models/elections');
const Questions = require('./models/questions');
const bcrypt = require('bcrypt');
// const {ObjectId} = require('mongodb');
const jwt_decode = require('jwt-decode'); 



const app = express()
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

const PORT = process.env.PORT || 5000;


app.post("/username", async (req, res) => {
    const {email} = req.body;
    try {
        const check = await users.findOne({ email: email});
        // console.log(check);
        if (!check) {
            // console.log('goodhere1')
            return res.send({message: "error 404"})
        }
        else {
            // console.log(check.fname);
            return res.send({message: check.fname});
        }
    }
    catch(err) {
        console.log(err);
        res.send("wrong Details");
    }
})

app.post("/register", async (req, res) => {
    let {fname, email, password} = req.body;
    // console.log(fname, email, password);
    try{
        const existingUser = await users.findOne({email: email});
        if (!existingUser) {
            // console.log("good here1");
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            password = hashedPassword;
            const result = await users.create({fname, email, password});
            // console.log(result);
            if (result.insertedCount === 1) {
                // console.log("good here2");
                res.send({message:'User registered successfully.'});
            }
            else {
                // console.log("good here3");
                res.send('User registration failed. Please try again.');
            }
        }
        else {
            // console.log("good here4")
            return res.send({message: "User already registered"});
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});
app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    // console.log(email + "  " + password);
    try {
        const check = await users.findOne({ email: email});
        // console.log(check);
        if (!check) {
            // console.log('goodhere1')
            return res.send("User not found")
        }
        const isPasswordMatch = await bcrypt.compare(password, check.password);
        if (!isPasswordMatch) {
            return res.send("wrong Password");
        }
        else {
            // console.log(check.name);
            return res.send("User is authentic");
        }
    }
    catch(err) {
        console.log(err);
        res.send("wrong Details");
    }
});
app.post("/loggoogle", async (req, res) => {
    const {credential} = req.body;
    // console.log(jwt_decode);
    const decodedCredential = jwt_decode.jwtDecode(credential);
    // console.log(decodedCredential);
    try {
        const check = await users.findOne({ email: decodedCredential.email});
        // console.log(check);
        if (!check) {
            // console.log('goodhere1')
            return res.send("User not found")
        }
        // const isPasswordMatch = await bcrypt.compare(password, check.password);
        if (decodedCredential.name !== check.fname){
            return res.send("wrong Password");
        }
        else {
            // console.log(check.name);
            return res.send({useremail: decodedCredential.email});
        }
    }
    catch(err) {
        console.log(err);
        res.send("wrong Details");
    }
});


app.post("/createquiz", async (req, res) =>{
    const {title, description, date, public1, userEmail} = req.body;
    // console.log(title, description, date, public1, userEmail);
    try{
        const result = await Election.create({title, description,date, public1, userEmail});
        return res.send({message: "Title saved successfully"})
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})


app.post("/deleteElection", async (req, res) =>{
    const {userEmail} = req.body;
    // console.log(title, description, date, public1, userEmail);
    try{
        const result = await Election.findOneAndDelete({userEmail});
        const result1 = await Questions.deleteMany({electionId: result._id});
        return res.send({message: "Data deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})


app.post("/myelectiondata", async (req, res) =>{
    const {userEmail} = req.body;
    // console.log(userEmail);
    try{
        const result1 = await Election.findOne({userEmail});
        if(result1){
            const result2 = await Questions.find({electionId: result1._id});
            const datapacket = [result1, result2];
            return res.send({dataPacket: datapacket});
        }
        else{
            return res.send({message: "No data present"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})


app.post("/checkresult", async (req, res) =>{
    const {selectedOptions, objId, QObjId, attemptedQues} = req.body;
    // console.log(req.body);
    // console.log(selectedOptions, objId, QObjId, attemptedQues);
    try{
        for (i in QObjId){
            if(selectedOptions[i] === ''){
                continue;
            }
            const result3 = await Questions.findOne({_id: QObjId[i]});
            // console.log("result3", result3, "\n");
            var newvalueofattempted = result3.peopleWhoAttempted + 1;
            if(result3.correctOption === selectedOptions[i]){
                var newvalue = result3.peopleWhoChoseRight + 1;
                // console.log(newvalue);
                // var filter = {_id: QObjId[i]};
                const result = await Questions.updateOne({_id: QObjId[i]},
                {$set: {peopleWhoChoseRight : newvalue, peopleWhoAttempted: newvalueofattempted}}
                );
            }
            else if(attemptedQues[i] !== 0){
                const result = await Questions.updateOne({_id: QObjId[i]},
                {$set: {peopleWhoAttempted: newvalueofattempted}}
                );
            }
        }
        return res.send({message: "Task done rightfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

app.post("/findelection", async (req, res) =>{
    const {objId} = req.body;
    // console.log(objId);
    try{
        const result = await Election.findOne({_id: objId});
        if(result){
            const result1 = await Questions.find({electionId: objId});
            // console.log(result1);
            var ques = [];
            var opt = [];
            var Object = [];
            for (i in result1){
                ques.push(result1[i].question);
                opt.push(result1[i].options);
                Object.push(result1[i]._id);
            }
            const packet = {title:result.title, 
                desc:result.description, 
                deadline: result.date,
                ques: ques,
                opt:opt,
                QobjId: Object
            }
            // console.log(packet);
            return res.send({message: 'Found data', packet:packet});
        }
        return res.send({message: "No data"})
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

app.post("/addq", async (req, res) =>{
    const questionArray = req.body;
    // console.log(req.body);
    var jodt = '';
    try{
        for (i in questionArray){
            const {question, options, correctOption, userEmail} = questionArray[i];
            if(jodt === ''){
                const result0 = await Election.findOne({userEmail: userEmail});
                // console.log(result0._id);
                jodt = result0._id;
            }
            // console.log(question, options, correctOption);
            const result = await Questions.create({question, options, correctOption, electionId:jodt, peopleWhoChoseRight:0, peopleWhoAttempted:0});
        }
        return res.send({message: 'Question saved successfully', codeOfElection: jodt});
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

app.listen(PORT, ()=>{
    console.log("started at port 5000");
})
