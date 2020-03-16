let APIURL = '';

switch(window.location.hostname) {
    // this is the local host name of your react app
    case 'localhost' || '127.0.0.1':
        // this is the local host name of you API
        APIURL = 'http://localhost:3001';
        break;
    case 'ng-thehypetrain.herokuapp.com':
        APIURL = 'https://git.heroku.com/ng-the-hype-train.git'
}

export default APIURL;