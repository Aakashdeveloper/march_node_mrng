import express from 'express'
import request from 'request'
const port =  7900;
const app = express();

//static file path
app.use(express.static(__dirname+'/public'))
//html
app.set('views', './views');
// engine 
app.set('view engine','ejs');

app.get('/weather',(req,res) => {
    const city = req.query.city?req.query.city:'Delhi'
    const api = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    request(api,(err,response)=>{
        if(err) throw err;
        const output = JSON.parse(response.body)
        //res.send(output)
        res.render('index',{title:'Weather App',result:output})
    })
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log('Server is running on port '+port)
})