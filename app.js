const express = require('express')
, app = express()
, server = require('http').createServer(app)
, Youtube = require("youtube-api")
, io = require('socket.io')(server)
, gapi = require('./lib/gapi')
, fs = require("fs")
, readJson = require("r-json")
, Logger = require("bug-killer")
, opn = require('opn')
, Spinner = require('cli-spinner').Spinner
, spinner = new Spinner('uploading.. %s')
  spinner.setSpinnerString('|/-\\');


/*****************************************************
 *                      APP                          *
 ****************************************************/


app.use(express.static(__dirname + '/public'));
server.listen(5000, ()=> {
  console.log('Youtube uploader app initiated! - localhost:5000');
});  


/*****************************************************
 *                    ROUTES                         *
 ****************************************************/


app.get('/', function(req, res,next) {  
  res.sendFile(__dirname + '/public/views/index.html');
});