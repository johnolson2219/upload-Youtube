const Youtube = require("youtube-api")
, readJson = require("r-json")
, Logger = require("bug-killer")
, opn = require("opn")
, CREDENTIALS = readJson(`${__dirname}/credentials.json`)

let oauth = Youtube.authenticate({
    type: "oauth"
  , client_id: CREDENTIALS.web.client_id
  , client_secret: CREDENTIALS.web.client_secret
  , redirect_url: CREDENTIALS.web.redirect_uris[0]
});

let url = oauth.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/youtube.upload'
});

exports.url = url;
exports.oauth = oauth;
exports.CREDENTIALS = CREDENTIALS;

