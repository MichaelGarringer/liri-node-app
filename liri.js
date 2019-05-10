require("dotenv").config();
var fs = require("fs")
var keys = require("./keys")

//Vars for user input//
var input = process.argv
var command = input[2]
var query = input[3]


//concert-this
if (command === "concert-this"){
    console.log("Concert")
}
//If the command is something different that concert-this run the correct command
switch(command){
//spotify-this-song
case "spotify-this-song":
console.log("spotify")
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