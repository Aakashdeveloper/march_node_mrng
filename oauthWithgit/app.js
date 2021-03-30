const express = require('express');
const app = express();
const superagent = require('superagent');
const request = require('request');
const port = 5600;

app.get('/',(req,res) => {
    res.send("<a href='https://github.com/login/oauth/authorize?client_id=6b8c2d1cdecf1ddbc839'>Login With Git</a>")
})

app.get('/auth',(req,res) => {
    const code = req.query.code;
    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'6b8c2d1cdecf1ddbc839',
            client_secret:'ae02d9c830f1cf24b2ed9cb7899046335e818624',
            code:code
        })
        .set('Accept','application/json')
        .end((err,result) => {
            if(err) throw err;
            var acctoken = result.body.access_token;
            const option = {
                url:'https://api.github.com/user',
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Authorization':'token '+acctoken,
                    'User-Agent':'mycode'
                }
            }
            request(option,(err,response,body)=>{
                return res.send(body)
            })
        })
})

app.listen(port)