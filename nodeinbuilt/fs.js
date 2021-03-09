var fs = require('fs');
const { connected } = require('process');


/*
fs.writeFile('mytext.csv','Ind Vs Eng',function(err){
    if(err) throw err;
    console.log("Task Done")
})

fs.appendFile('myfile.txt','This is row number 1\n',function(err){
    if(err) throw err;
    console.log('append done')
})

//Read File
fs.readFile('myfile.txt','utf-8',function(err,data){
    if(err) throw err;
    console.log(data)
})

//rename
fs.rename('mytext2.txt','mytext3.txt',function(err){
    if(err) throw err;
    console.log('file renamed')
})*/

fs.unlink('mytext3.txt',function(err){
    if(err) throw err;
    console.log('File Deleted')
})