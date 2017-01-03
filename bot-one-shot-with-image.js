var fs = require('fs'),
    Twit = require('twit'),
    T = new Twit(require('./settings')),
    R = require('ramda'),
    b64content = fs.readFileSync('test.jpg', { encoding: 'base64' });
    getUserData = function(user){
        "use strict";

        return {
            id: user.id,
            name: user.screen_name
        }
    },
    generateTweetMessage = function(user, mediaIdStr) {
        "use strict";

        return {
            status: "@" + user.name + " come stai? Mi sembri in ottima forma nonsotante i pranzi e le cene delle feste!",
            media_ids: [mediaIdStr]
        };
    },
    generateTweetPost = function(status) {
        "use strict";

        console.log(status);

        /*T.post('statuses/update', status, function(err, data, http_response) {
            if (err) {
                console.log('error ' + err);
            } else {
                console.log('all statuses are update');
            }
        });*/
    },
    generateTweet = function(media){
        return function(user) {
            "use strict";

            generateTweetPost(generateTweetMessage(user, media));
        }
    };

T.post('media/upload', { media_data: b64content }, function (err, data, http_response) {
    var mediaIdStr = data.media_id_string,
        altText = "this is a test image",
        meta_params = {
            media_id: mediaIdStr,
            alt_text: { text: altText }
        };

    console.log(meta_params);

    T.post('media/metadata/create', meta_params, function (err, data, http_response) {
        if (!err) {

            console.log('image upload');

            T.get('lists/members', { 'slug': 'test', 'owner_screen_name' : 'MPBotterinojs'}, function(err, data, http_response) {
                if (err) {
                    console.log('error ' + err);
                } else {
                    var usersList = R.map(getUserData, data.users);

                    console.dir(usersList);

                    R.forEach(generateTweet(mediaIdStr), usersList);
                }
            });
        }
    })
});


