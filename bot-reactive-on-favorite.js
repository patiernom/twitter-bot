var Twit = require('twit'),
    T = new Twit(require('./settings')),
    stream = T.stream('user');


stream.on('favorite', function (event) {
    console.dir(event);
});

stream.on('error', function (error) {
   console.error(error);
});
