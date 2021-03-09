var http = require('http');

var server = http.createServer(function(req,res){
    res.write("Welcome to node");
    res.end()
})

server.listen(9800)