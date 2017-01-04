const user = require('./user');

var Twit = require('twit'),
    T = new Twit(require('./secret')),
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

        generateTweetPost(generateTweetMessage(data.member));
    },
    evaluateAction = function(data) {
        "use strict";

        console.log('const ' + user.id + ' === ' + data.user.id);

        if (user.id === data.user.id ) {
            generateTweet(data);
        }

        return false;
    };

stream.on('list_member_added', function (response) {
    console.log(response);
    /* RESPONSE PROPERTY
     *  event --> event name
     *  source
     *    id --> user id
     *    screen_name --> handle of user that perfomed an action
     *  target_object
     *    id --> status id
     *    text --> text of status
     */

    /*var data = {
        event_name: response.event,
        post: {
          id: response.target_object.id_str,
          text: response.target_object.text
        },
        member: {
            id: response.target_object.user.id_str,
            name: response.target_object.user.screen_name
        },
        user: {
            id: response.source.id_str,
            name: response.source.screen_name
        }
    };*/

    //evaluateAction(data);
});

stream.on('error', function (error) {
   console.error(error);
});
