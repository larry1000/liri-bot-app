require('dotenv').config()
var Spotify = require('node-spotify-api')
var keys = require('./keys.js')
var request = require('request')
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
})

// var input = process.argv
// //console.log(input)
// for (var i = 2; i < input.length; i++) {
//     console.log(input[i])
// }

// var input = process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });
// var input = process.argv[2]
// var input = process.argv.slice(2).join(" ");
var input = process.argv[2]
// Joining the remaining arguments since an actor or tv show name may contain spaces
// var title = process.argv.slice(3).join(" ");
// var infoEntered = process.argv;
// var input = process.argv[2];
// var title = ""
// if (process.argv[3] !== undefined) {
//   for (i = 3; i < infoEntered.length; i++) {
//     title += infoEntered[i] + " ";
//   };
// };      
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
// function movie() {
//   if (process.argv[3] === undefined) {
//     title = "Mr.Nobody";
//     movieThis();
//   } else if (title !== undefined) {
//     titleSplit = title.split(" ");
//     title = titleSplit.join("+");
//     movieThis();
//   };
// };
function movieThis (movie) {
  var queryURL = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy';

      
  request(queryURL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('Release Year: ' + JSON.parse(body).Year + ' Rating: ' + JSON.parse(body).imdbRating)
      
    }
  })
}

function concertThis (artist) {
  var queryURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';
  request(queryURL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(queryURL)
      console.log('Concert: ' + JSON.parse(body)[0].lineup)
      console.log('Concert: ' + JSON.parse(body)[0].venue.name)
    }
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
  default:
    console.log('No input was found')
    break

}