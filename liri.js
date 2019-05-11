require("dotenv").config();
var axios = require("axios")
var fs = require("fs")
var Spotify = require('node-spotify-api');
var keys = require("./keys")
var moment = require("moment")

//Vars for user input//
var input = process.argv
var command = input[2]
var query = input[3]


//concert-this

//If the command is something different that concert-this run the correct command
switch (command) {
    case "concert-this":
        concert(query)
        break;
    //spotify-this-song
    case "spotify-this-song":
        spotify(query);
        break;

    //movie-this
    case "movie-this":
        movie(query);
        break;

    //do-what-it-says
    case "do-what-it-says":
        doIt()
        break;
    default:
        console.log(`
    Use one of the following statements
    concert-this
    spotify-this-song
    movie-this
    do-what-it-says
    `)
};



//Spotify function
function spotify(query = "The Sign Ace of Base") {
    var spotify = new Spotify(keys.spotify);
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
};
//Movie function
function movie(query = "mr nobody") {

    var queryURL = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&tomatoes=true&apikey=trilogy";


    axios.get(queryURL).then(function (response) {
        console.log(
            `Title: ${response.data.Title}
Year: ${response.data.Year}
Plot: ${response.data.Plot}
`
        )


    });

}
//Concert function
function concert(query) {
    if (!query) {
        query = "Shaky Graves"
    }
    var queryURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(function (response) {

        var artData = response.data
        console.log(
            `
    Artist(s): ${artData[0].lineup}
    Venue: ${artData[0].venue.name}
    Location: ${artData[0].venue.city}
    Time: ${moment(artData[0].datatime).format("MMMM Do YYYY, h:mm:ss a")}
    `
        )
    }

    )
};

//Do it function
function doIt() {
    fs.readFile("random.txt", "utf-8", function (err, response) {
        var dataArray = response.split(",")
        console.log(dataArray[0])
        //If the command is something different that concert-this run the correct command
        switch (dataArray[0]) {
            //spotify-this-song
            case "spotify-this-song":
                spotify(dataArray[1]);
                break;

            //movie-this
            case "movie-this":
                movie(dataArray[1]);
                break;

            //do-what-it-says
            case "concert-this":
                console.log("Concert")
                break;
        };


    })
}


