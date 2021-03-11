var express = require('express');
var app = express();
var port = 9800;
var hotelRouter = require('./controller/routes/hotelRouter');
var cityRouter = require('./controller/routes/cityRouter');

//static file path
app.use(express.static(__dirname+'/public'))
//html
app.set('views', './views');
// engine 
app.set('view engine','ejs');

app.get('/',(req,res) => {
    //res.send('<h1>Node Js</h1>')
    res.render('index',{title:'Home Page'})
});

app.use('/hotel', hotelRouter)
app.use('/city', cityRouter)

app.listen(port,function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
});