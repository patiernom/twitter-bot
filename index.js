//@MPBotterinojs + #testMeNow + <selection> + <handle>

var TwitterPackage = require('twitter'),
    secret = require("./secret"),
    Twitter = new TwitterPackage(secret);

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: '#TechKnightsDemoRandom'}, function(stream) {

    // ... when we get tweet data...
    stream.on('data', function(tweet) {

        // print out the text of the tweet that came in
        console.log(tweet.text);

        //split up the tweet's text
        var tipArr = tweet.text.split(" "),
            user_selection = tipArr[2],
            user_handle = tipArr[3];

        //build our reply string
        var reply = "Hi @" + tweet.user.screen_name + " your selection is " + user_selection + " is for  " + user_handle + "!";

        //call the post function to tweet something
        Twitter.post('statuses/update', {status: reply},  function(error, tweetReply, response){

            //if we get an error print it out
            if(error){
                console.log(error);
            }

            //print the text of the tweet we sent out
            console.log(tweetReply.text);
        });
    });

    // ... when we get an error...
    stream.on('error', function(error) {
        //print out the error
        console.log(error);
    });
});
