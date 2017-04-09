const express = require('express')
, app = express()
, server = require('http').createServer(app)
, Youtube = require("youtube-api")
, io = require('socket.io')(server)
, gapi = require('./lib/gapi')
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


/*****************************************************
 *             SOCKET.IO EVENT LISTENERS            *
 ****************************************************/

let currentVideo = {};

io.on('connection', function(socket){

  socket.on('start', function(video){

    currentVideo = video

    opn(gapi.oauth.generateAuthUrl({
        access_type: "offline"
      , scope: ["https://www.googleapis.com/auth/youtube.upload"]
    }));

    app.get('/oauth2callback', function(req, res) {
      let code = req.query.code;

      Logger.log("Trying to get the token using the following code: " + code);
      
      gapi.oauth.getToken(code, (err, tokens) => {

        if (err) {
            console.error(err)
            res.status(500).send(err)
            return Logger.log(err);
        }

        Logger.log("Got the tokens.");

        gapi.oauth.setCredentials(tokens);

        res.send("The video is being uploaded. Check out the logs in the terminal.");

        let req = Youtube.videos.insert({
            resource: {
                // Video title and description
                snippet: {
                    title: currentVideo.title
                  , description: currentVideo.description
                }
               
              , status: {
                    privacyStatus: currentVideo.privacyStatus
                }
            }
            // This is for the callback function
          , part: "snippet,status"

          , media: {
                body: currentVideo.video
            }
        }, (err, data) => {
            if (data) { 
              socket.emit('done', currentVideo);
              spinner.stop(true)
              Logger.log('Done!')
            }
            if (err) { 
              console.error(err)
            }
        });
        spinner.start();
      });
    });

  });
});
