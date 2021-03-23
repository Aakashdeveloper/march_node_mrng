const express = require('express');
const app = express();
const port = process.env.PORT || 9080;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodParser = require('body-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongourl = "mongodb://localhost:27017";
let db;
let col_name = "user";
app.use(cors());
///parse data for post call
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodParser.json())

// Health Check
app.get('/',(req,res) => {
    res.status(200).send("Health Ok")
})

// post User
app.post('/addUser',(req,res) => {
    console.log(req.body)
    db.collection(col_name).insert(req.body,(err,result) => {
        if(err) throw err;
        res.status(200).send('Data Added')
    })
})

// getAllUser
app.get('/users',(req,res) => {
    db.collection(col_name).find().toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    })
})

// get Particular Use
app.get('/user/:id',(req,res) => {
    var id = mongo.ObjectID(req.params.id)
    var query = {};
    query = {_id:id}
    db.collection(col_name).findOne(query,(err,result)=> {
        if(err) throw err;
        res.send(result)
    })
})


MongoClient.connect(mongourl,(err,connection)=>{
    if(err) console.log(err);
    db = connection.db('marchnode');
})

//start server
app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})