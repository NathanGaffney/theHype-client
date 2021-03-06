let APIURL = '';

switch(window.location.hostname) {
    // this is the local host name of your react app
    case 'localhost' || '127.0.0.1':
        // this is the local host name of you API
        APIURL = 'http://localhost:3001';
        break;
    case 'ng-the-hype-train.herokuapp.com': // client
        APIURL = 'https://ng-thehypetrain.herokuapp.com' // server
}

export default APIURL;