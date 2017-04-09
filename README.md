# Youtube Uploader

Node.js application built to upload videos directly to a youtube channel by using the Youtube API asynchronously.

## Getting Started

### Create a Google App
In order to use this app, is necessary to create a google app in your [Google Console](https://console.developers.google.com/) and obtain the application credentials to handle the OAuth2 callback url *(download the .json file provided by the app)*.

***Note: For development this app is using `http://localhost:5000/` but you can modify that in the `app.js` file. (it must match your google app "redirect_uris")***

```js
// app.js
server.listen(port, ()=> { //=> 5000
 
}); 

```

It looks like this:

```js
// credentials.json

{"web":
  {
    "client_id":"your_client_id.apps.googleusercontent.com",
    "project_id":"youtube-app-your_app_id",
    "auth_uri":"https://accounts.google.com/o/oauth2/auth",
    "token_uri":"https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
    "client_secret":"your_client_secret",
    "redirect_uris":["http://your-server-url/oauth2callback"],
    "javascript_origins":["http://your-server-url"]
  }
}
```

Add your `credentials.json` file to the `lib` directory:

```
├── app.js
├── lib
│   ├── credentials.json <=
│   └── gapi.js
├── package.json
└── public
    ├── css
    │   └── index.css
    ├── js
    │   └── index.js
    └── views
        └── index.html
```

### Install Dependencies

`cd` into the app directory and run:

```
npm install
```

### Initiate App

Once all dependencies have been installed, initiate the app by running:

```
node app.js
```

*Enjoy!!*

## Contributing Bugfixes or Features

For submitting something back, be it a patch, some documentation, or new feature requires some level of
community interactions.

Committing code is easy:

- Fork the this repository
- Create a local development branch for the bugfix; I recommend naming the branch such that you'll
  recognize its purpose.
- Commit a change, and push your local branch to your github fork
- Send me pull request for your changes to be included

I apologize in advance for the slow action on pull requests and issues.

## License
Youtube Uploader is licensed under the MIT license. (http://opensource.org/licenses/MIT)
