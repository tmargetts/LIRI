## Description: 

LIRI means *Language Interpretation and Recognition Interface*

LIRI currently sends requests to the Twitter, Spotify and OMDB APIs

This application will be utilized within the terminal. 

Here's what each command should do...

1. For a random search, type this: 

`node liri.js do-what-it-says`

2. To search a movie title, type this: 

`node liri.js movie-this` (followed by movie title) 

This will output the following information to your terminal:

* Title of the movie
* Year the movie came out
* IMDB Rating of the movie
* Rotten Tomatoes Rating of the movie
* Country where the movie was produced
* Language of the movie
* Plot of the movie
* Actors in the movie

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

3. To search Spotify for a song, type this: 

`node liri.js spotify-this-song` (number of desired songs to be returned) (song title)

This will show the following information about the song in your terminal:

* Artist(s) 
* The song's name 
* A preview link of the song from Spotify 
* The album that the song is from

If no song is provided then your program will default to "The Sign" by Ace of Base.

4. To see the last 20 tweets on Twitter: 

`node liri.js my-tweets`

   * This will show your last 20 tweets (in your terminal) and when they were created

Technologies Utilized: Node.js, Spotify API, Twitter API, and OMDB API
