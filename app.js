// jshint ignore:start
const express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  Youtube = require("youtube-api"),
  io = require('socket.io')(server),
  gapi = require('./lib/gapi'),
  readJson = require("r-json"),
  Logger = require("bug-killer"),
  Spinner = require('cli-spinner').Spinner,
  spinner = new Spinner('uploading.. %s')
session = require("express-session"),
  fs = require('fs'), {
    prepareDownload
  } = require("./utils"),
  download = require('download');
var bodyParser = require('body-parser')

spinner.setSpinnerString('|/-\\')


/*****************************************************
 *                      APP                          *
 ****************************************************/
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(function(req, res, next) {
  Logger.log(req.originalUrl);
  next()
})

app.use(session({
  secret: 'krunal',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(__dirname + '/public'));
server.listen(5000, () => {
  console.log('Youtube uploader app initiated! - localhost:5000');
});

app.locals.videos = [];



/*****************************************************
 *                    ROUTES                         *
 ****************************************************/


app.get('/', function(req, res, next) {
  console.log(req.session);
  res.sendFile(__dirname + '/public/views/login.html');
});

app.get("/auth", function(req, res) {
  const redirectUri = gapi.oauth.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/youtube.upload"]
  });
  res.redirect(redirectUri);
})

app.get('/oauth2cb', async function(req, res) {
  let code = req.query.code;
  gapi.oauth.getToken(code, function(err, tokens) {
    if (err) {
      console.error(err)
      return res.end(err);
    }
    req.session.tokens = tokens;
    res.redirect("/home");
  });

});


app.post('/start', function(req, res, next) {
  const videos = req.body.videos;
  console.log(req.body);
  if (req.session.tokens) {
    prepareDownload({
      socket: app.locals.socket,
      videos, tokens: req.session.tokens
    }).then(d=>console.log(d)).catch(console.error);
    res.end("uploading started");
  } else res.end("please authenticate first");
});


app.get('/home', async function(req, res) {
  if (req.session.tokens)
    res.sendFile(__dirname + '/public/views/index.html');
  else res.redirect("/");
});

/*****************************************************
 *             SOCKET.IO EVENT LISTENERS            *
 ****************************************************/



io.on('connection', function(socket) {
  app.locals.socket = socket;
});



process.on('uncaughtException', function(err) {
  console.error(err.stack);
  process.exit();
});