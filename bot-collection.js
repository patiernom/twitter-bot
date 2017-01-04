var Twit = require('twit'),
    T = new Twit(require('./secret')),
    R = require('ramda'),
    getUserData = function(user){
        "use strict";

        return {
            id: user.id,
            name: user.screen_name
        }
    },
    generateTweetMessage = function(user) {
        "use strict";

        return "@" + user.name + " come stai? Mi sembri in ottima forma nonsotante i pranzi e le cene delle feste!";
    },
    generateTweetPost = function(reply) {
        "use strict";

        T.post('statuses/update', { status: reply }, function(err, data, response) {
            if (err) {
                console.log('error ' + err);
            } else {
                //console.log(data);
                console.log('all statuses are update');
            }
        });
    },
    generateTweet = function(user) {
        "use strict";

        generateTweetPost(generateTweetMessage(user));
    };

T.get('collections/list', { 'screen_name': 'MPBotterinojs'}, function(err, data, response) {
    if (err) {
        console.log('error ' + err);
    } else {
        console.log(data);
    }
});

