var Twit = require('twit'),
    T = new Twit(require('./settings')),
    stream = T.stream('user'),
    generateTweetMessage = function(user) {
        "use strict";

        return "@" + user.name + " grazie... anche tu sei nei nostri cuori!";
    },
    generateTweetPost = function(reply) {
        "use strict";

        T.post('statuses/update', { status: reply }, function(err, data, http_response) {
            if (err) {
                console.log('error ' + err);
            } else {
                // console.log(data);
                console.log('statuses replies to user');
            }
        });
    },
    generateTweet = function(data) {
        "use strict";

        generateTweetPost(generateTweetMessage(data.user));
    };


stream.on('favorite', function (response) {
    //console.log(response);
    /* RESPONSE PROPERTY
     *  event --> event name
     *  source
     *    id --> user id
     *    screen_name --> handle of user that perfomed an action
     *  target_object
     *    id --> status id
     *    text --> text of status
     */

    var data = {
        event_name: response.event,
        post: {
          id: response.target_object.id,
          text: response.target_object.text
        },
        user: {
            id: response.source.id,
            name: response.source.screen_name
        }
    };

    console.log(data.user.name + ' perform ' + data.event_name + ' for statuses ' + data.post.text);
    
    generateTweet(data)

});

stream.on('error', function (error) {
   console.error(error);
});
