var fs = require('fs'); 
var request = require('request');
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

// input command into terminal so it knows what its looking for and what to do

var command = process.argv[2];
var searchWhat = "";

// Makes what you search a string
for (var i = 3; i < process.argv.length; i++) {
    searchWhat += process.argv[i] + " ";
};

// Just in case we receive errors, not that we need it cus we never get any....
function errorFunction(respError) {
    if (respError) {
        return console.log("Error occured: ", respError);
     }
};

//---------------TWITTER-----------------//

function getTweets() {
    // Accesses Twitter Keys
    var client = new Twitter(keys.twitter); 
    var params = {
        screen_name: 'phat_stacks_',
        count: 20
        };

    client.get('statuses/user_timeline', params, function(respError, tweets, response) {

        errorFunction();

        console.log("\nBig Daddy Phat Stacks\n");

        for (i = 0; i < tweets.length; i++) {
            console.log(i + 1 + ". Tweet: ", tweets[i].text);

        };

        console.log("----------------------------------------\n");
    });
};

//-------------Spotify-------------//
function searchSong(searchWhat) {

    // If no song is inputted to search by default search The Sign Ace of Base
    if (searchWhat == "") {
        searchWhat = "The Sign Ace of Base";
    }

    // Accesses Spotify keys  
    var spotify = new Spotify(keys.spotify);

    var searchLimit = "";

    // This is the number of songs displayed after the search is complete. The user inputs the amount of songs they want returned
    if (isNaN(parseInt(process.argv[3])) == false) {
        searchLimit = process.argv[3];

        console.log("\nYou requested to return: " + searchLimit + " songs");
        
        // Resets the searchWhat to account for searchLimit
        searchWhat = "";
        for (var i = 4; i < process.argv.length; i++) {        
            searchWhat += process.argv[i] + " ";
        };

    } else {
        console.log("\nTo get more than 1 song, type the number of songs you would like to be returned after you enter spotify-this-song *number* *song name*.\n\nExample: if you would like 3 results returned then enter:\n     node.js spotify-this-song 3 Ms. New Booty")
        searchLimit = 1;
    }
   
    // Searches Spotify with given values
    spotify.search({ type: 'track', query: searchWhat, limit: searchLimit }, function(respError, response) {

        errorFunction();

        var songResp = response.tracks.items;

        for (var i = 0; i < songResp.length; i++) {
            console.log("\n----Spotify Search Result "+ (i+1) +"----\n");
            console.log(("Artist: " + songResp[i].artists[0].name));
            console.log(("Song title: " + songResp[i].name));
            console.log(("Album name: " + songResp[i].album.name));
            console.log(("URL Preview: " + songResp[i].preview_url));
            console.log("\n------------------------------------------\n");
        }
    })
};

//-----------OMDB movie-this---------------//
function searchMovie(searchWhat) {

    // Default search value if no movie is given
    if (searchWhat == "") {
        searchWhat = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + searchWhat.trim() + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(respError, response, body) {

        errorFunction();

        if (JSON.parse(body).Error == 'Movie not found!' ) {

            console.log("\nNo matches found for " + searchWhat + ". Search Batman for best results.\n")
        
        } else {

            movieBody = JSON.parse(body);

            console.log("\n----OMDB Search Results----\n");
            console.log("Movie Title: " + movieBody.Title);
            console.log("Year: " + movieBody.Year);
            console.log("IMDB rating: " + movieBody.imdbRating);

            // If there is no Rotten Tomatoes Rating
            if (movieBody.Ratings.length < 2) {

                console.log("There are no Rotten Tomatoes Rating for this movie.")
                
            } else {

                console.log("Rotten Tomatoes Rating: " + movieBody.Ratings[[1]].Value);
            }
            
            console.log("Country: " + movieBody.Country);
            console.log("Language: " + movieBody.Language);
            console.log("Plot: " + movieBody.Plot);
            console.log("Actors: " + movieBody.Actors);
            console.log("\n--------------------------------\n");
            console.log("xxxx Log Ended xxxx");
        };      
    });
};

//---------------Random do-what-it-says----------------//
function randomSearch() {

    fs.readFile("random.txt", "utf8", function(respError, data) {

        var randomArray = data.split(", ");

        errorFunction();

        if (randomArray[0] == "spotify-this-song") {
            searchSong(randomArray[1]);
        } else if (randomArray[0] == "movie-this") {
            searchMovie(randomArray[1]);
        } else {
            getTweets();
        }
    });
};

//-------------Main Switch Case-------------------//

// Function will fun based off of user input of the specific command
switch (command) {
    case "my-tweets":
        getTweets();
        break;
    case "spotify-this-song":
        searchSong(searchWhat);
        break;
    case "movie-this":
        searchMovie(searchWhat);
        break;
    case "do-what-it-says":
        randomSearch();
        break;
    default:
        console.log("\n" + command + " is not a command that I recognize. Please use these commands: \n\n  1. For a random search type this: node liri.js do-what-it-says \n\n  2. To search a movie title type this: node liri.js movie-this (followed by movie title) \n\n  3. To search Spotify for a song type this: node liri.js spotify-this-song (number of desired songs to be returned) (song title)\n Example: node liri.js spotify-this-song 3 Ms. New Booty\n\n  4. To see the last 20 of Big Daddy Phat Stacks' tweets on Twitter: node liri.js my-tweets \n");
};