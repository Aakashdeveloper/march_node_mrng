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
    var query = {}
    if(req.query.city && req.query.role){
        query = {city:req.query.city,isActive:true,role:req.query.role}
    }
    else if(req.query.city){
        query = {city:req.query.city,isActive:true}
    }else if(req.query.role){
        query = {role:req.query.role,isActive:true}
    }
    db.collection(col_name).find(query).toArray((err,result) => {
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

// update user
app.put('/updateUser',(req,res) => {
    let id = req.body._id
    db.collection(col_name).update(
        {_id:mongo.ObjectID(id)},
        {
            $set:{
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                city: req.body.city,
                role: req.body.role,
                isActive: req.body.isActive?req.body.isActive:true
            }
        },(err,result) => {
            if(err) throw err;
            res.send('Data Updated')
        }
    )
})

//delete(hard Delete)
app.delete('/deleteUser',(req,res) => {
    let Id = mongo.ObjectID(req.body._id);
    db.collection(col_name).remove({_id:Id},(err,result) => {
        if(err) throw err;
        res.send("Data Deleted")
    })
})

//activate user
app.put('/activateUser',(req,res) => {
    let id = req.body._id
    db.collection(col_name).update(
        {_id:mongo.ObjectID(id)},
        {
            $set:{
                isActive: true
            }
        },(err,result) => {
            if(err) throw err;
            res.send('User Activated')
        }
    )
})

//deactivate user (soft Delete)
app.put('/deactivateUser',(req,res) => {
    let id = req.body._id
    db.collection(col_name).update(
        {_id:mongo.ObjectID(id)},
        {
            $set:{
                isActive: false
            }
        },(err,result) => {
            if(err) throw err;
            res.send('User Deactivated')
        }
    )
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