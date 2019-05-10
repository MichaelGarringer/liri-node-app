require("dotenv").config();
var fs = require("fs")
var Spotify = require('node-spotify-api');
var keys = require("./keys")

//Vars for user input//
var input = process.argv
var command = input[2]
var query = input[3]


//concert-this
if (command === "concert-this") {
    console.log("Concert")
}
//If the command is something different that concert-this run the correct command
switch (command) {
    //spotify-this-song
    case "spotify-this-song":
        spotify(query);
        break;

    //movie-this
    case "movie-this":
        console.log("Movies")
        break;

    //do-what-it-says
    case "do-what-it-says":
        console.log("Text")
        break;
};



//Spotify function
function spotify(query) {
    var spotify = new Spotify(keys.spotify);
    if (!query) {
        query = "The Sign"
    }
    spotify.search({ type: 'track', query: query }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
     var song = data.tracks.items;
        console.log(
            `
Song: ${song[0].name}
Artist:${song[0].artists[0].name}
Album: ${song[0].album.name}
Preview link: ${song[0].preview_url}
  `
        )
    });
}
