var Twit = require('twit');
var TwitterBot = require('node-twitterbot').TwitterBot;
var Bot = new TwitterBot(require('./settings'));
var phraseArray = [ "hey twitter",
    "im tweeting",
    "tweet tweet",
    "tweetstorm time... 1/22",
    "plz RT v important",
    "delete ur account",
    "it me",
    "same",
    "#dogpants go on 4 legs!!",
    "#thedress is blue and black" ];

function chooseRandom(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}

setInterval(function() {
    try {
        var phrase = chooseRandom(phraseArray) + ", " + chooseRandom(phraseArray);
        Bot.tweet(phrase);
    }
    catch (e) {
        console.log(e);
    }
}, 24 * 60 * 60 * 1000);
