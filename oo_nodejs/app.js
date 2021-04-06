import express from 'express';
const app = express();
const port = 8700;
import database from './database';

app.get('/getData',(req,res) => {
    let output = database.getData('user');
    res.send(output)
})

app.post('postData',(req,res) => {
    var mydata = req.body;
    let output = database.postData('user',mydata);
    res.send(output)
})

app.listen(port)