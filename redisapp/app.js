const express = require('express');
const axios = require('axios');
const redis = require('redis');
const app = express();
const port = 9870;

const client = redis.createClient({
    host:'localhost',
    port:6379
})


app.get('/data',(req,res) => {
    const userinput = req.query.country?req.query.country:'India';
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userinput}`;
    return client.get(`country:${userinput}`,(err,result) => {
        if(result){
            const output = JSON.parse(result);
            return res.send(output)
        }else{
            return axios.get(url)
                .then(response => {
                    const output = response.data;
                    client.setex(`country:${userinput}`,3600,JSON.stringify({source:'Redis',output}));
                    return res.send({source:'api',output})
                })
        }
    })
})

app.listen(port,(err)=>{
    console.log(`Server is running on port ${port}`)
})
