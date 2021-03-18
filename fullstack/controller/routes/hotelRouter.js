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

  hotelRouter.route('/details/:id')
    .get((req,res) => {
      // var id = req.params.id;
      var {id} = req.params
      mongodb.connect(url,(err,conn)=>{
        if(err) {res.status(404).send('Error While connecting')}
        else{
          const dbo = conn.db('marchnode');
          dbo.collection('hotels').find({_id:id}).toArray((err,data) =>{
            if(err) {res.status(500).send('Error While Fetching')}
            else{
              res.render('hotelDetails',{title:'Hotels Page',hotels:data,menu:menu});
            }
          })
        }
      })
    })
  
  return hotelRouter
}

module.exports = router