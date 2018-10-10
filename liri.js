require('dotenv').config()
var Spotify = require('node-spotify-api')
var keys = require('./keys.js')
var request = require('request')
var moment = require('moment')
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
})
var fs = require('fs')

var input = process.argv[2]
    
// Functions
function spotifyThis (song) {
  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err)
    }
    var songs = data.tracks.items[0]
    console.log('\nArtist: ' + songs.artists[0].name + '\nSong Title: ' + songs.name + ' \nAlbum name: ' + songs.album.name + '\nPreview: ' + songs.preview_url)
  })
}

function movieThis (movie) {

  if(movie === undefined){
    
    movie ="Mr Nobody"
  }
  var queryURL = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy';    
  request(queryURL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body)
      console.log("\nTitle: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nActors: " + JSON.parse(body).Actors + "\nRating: " + JSON.parse(body).imdbRating + "\nPlot: " + JSON.parse(body).Plot + "\nLanguage: " + JSON.parse(body).Language + "\nRotten Tomatoes: " + JSON.parse(body).Ratings[1].Value + "\nCountry: " + JSON.parse(body).Country)
      
    }
  })
}

function concertThis (artist) {
  var queryURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';
  request(queryURL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      
      console.log('Concert: ' + JSON.parse(body)[0].lineup)
      console.log('Venue Name: ' + JSON.parse(body)[0].venue.name)
      console.log('Venue Location: ' + JSON.parse(body)[0].venue.city);
      console.log('Date: ' + moment(JSON.parse(body)[0].datetime).format('MM/DD/YYYY'));
    }
  })
}
function doWhatItSays () {
  fs.readFile('random.txt', 'utf8', (err, data) => {
    if (err) {
      return console.log('Error occurred: ' + err)
    }
    var splitArray = data.split(',')
    console.log(splitArray)
    spotifyThis(splitArray[1])
  })
}


// Logic
switch (input) {
  case 'spotify-this-song':
    spotifyThis(process.argv[3])

    break
  case 'movie-this':
    movieThis(process.argv[3])

    break
  case 'concert-this':
    concertThis(process.argv[3])

    break
  case 'do-what-it-says':
    doWhatItSays(process.argv[3])

    break
  default:
    console.log('No input was found')
    break

}