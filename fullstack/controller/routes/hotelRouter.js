var express = require('express');
var hotelRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

  
function router(menu){
  hotelRouter.route('/')
    .get((req,res) => {
      //res.send(hotels)
      mongodb.connect(url,(err,conn)=>{
        if(err) {res.status(404).send('Error While connecting')}
        else{
          const dbo = conn.db('marchnode');
          dbo.collection('hotels').find({}).toArray((err,data) =>{
            if(err) {res.status(500).send('Error While Fetching')}
            else{
              res.render('hotels',{title:'Hotels Page',hotels:data,menu:menu});
            }
          })
        }
      })
      
    })

  hotelRouter.route('/details')
    .get((req,res) => {
      res.send("Hotel details")
    })
  
  return hotelRouter
}

module.exports = router