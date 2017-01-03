var Twit = require('twit'),
    T = new Twit(require('./settings')),
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

        console.log(reply);

        /*T.post('statuses/update', { status: reply }, function(err, data, response) {
            console.log(data);
        })*/
    },
    generateTweet = function(user) {
        "use strict";

        generateTweetPost(generateTweetMessage(user));
    };

T.get('lists/members', { 'slug': 'test', 'owner_screen_name' : 'MPBotterinojs'}, function(err, data, response) {
    if (err) {
        console.log('error ' + err);
    } else {
        var usersList = R.map(getUserData, data.users);

        console.dir(usersList);

        R.forEach(generateTweet, usersList);
    }
});

