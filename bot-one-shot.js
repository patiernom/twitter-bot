var Twit = require('twit');
var T = new Twit(require('./settings'));

T.get('lists/members', { 'slug': 'test', 'owner_screen_name' : 'MPBotterinojs'}, function(err, data, response) {
    if (err) {
        console.log('error ' + err);
    } else {
        console.log('data: ');
        console.dir(data.users);
        /*console.log('response: ');
        console.dir(response);*/
    }
});

