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
    addUserToList = function(data, list) {
        "use strict";

        var status = {
            'slug': list,
            'owner_screen_name' : data.user.name,
            'screen_name': data.member.name
        };

        T.post('lists/members/create', status, function(err, data, http_response) {
            if (err) {
                console.log('error ' + err);
            } else {
                console.log(user.screen_name + ' is now added to list' + status.slug);
            }
        });
    },
    generateTweet = function(data) {
        "use strict";

        generateTweetPost(generateTweetMessage(data.user));
    },
    evaluateAction = function(data) {
        "use strict";

        if (user.id === data.user.id ) {
            addUserToList(data, user.selected_list);
            generateTweet(data);
        }

        return false;
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
        member: {
            id: response.target_object.user.id,
            name: response.target_object.user.screen_name
        },
        user: {
            id: response.source.id,
            name: response.source.screen_name
        }
    };

    console.log(data.user.name + ' perform ' + data.event_name + ' for statuses ' + data.post.text);

    evaluateAction(data);
});

stream.on('error', function (error) {
   console.error(error);
});
