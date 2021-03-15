var express = require('express');
var app = express();
var port = 9800;
var menu =[
    {link:'/',name:'Home'},
    {link:'/hotel',name:'Hotels'},
    {link:'/city',name:'City'}
]
var hotelRouter = require('./controller/routes/hotelRouter')(menu);
var cityRouter = require('./controller/routes/cityRouter')(menu);

//static file path
app.use(express.static(__dirname+'/public'))
//html
app.set('views', './views');
// engine 
app.set('view engine','ejs');

app.get('/',(req,res) => {
    //res.send('<h1>Node Js</h1>')
    res.render('index',{title:'Home Page',menu:menu})
});

app.use('/hotel', hotelRouter)
app.use('/city', cityRouter)

app.listen(port,function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
});