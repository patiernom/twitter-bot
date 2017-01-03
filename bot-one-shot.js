var Twit = require('twit');
var T = new Twit(require('./settings'));

T.get('lists/members', { 'slug': 'test', 'owner_screen_name' : 'MPBotterinojs'}, function(err, data, response) {
    console.log('error ' + err);
    console.log('data ' + data);
    console.log('response ' + response);
});

