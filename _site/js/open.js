// On page loading
const PrintGameTable = require('janohirmas-printgametable');
const Fs = require('fs');
const CsvReadableStream = require('csv-reader');
var sGamesDir = '/sections/games/Games.csv';
const Path = require('path');

function ReadGames(dir) {
    let Games = [];
    jsonPath = Path.resolve(dir);
    console.log(jsonPath);
    let inputStream = Fs.createReadStream(jsonPath, 'utf8').pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true })).on('data', function (row) {
        Games[row[0]] = row.slice(1,row.length);
    }).on('end', function (data) {
        console.log('No more rows!');
    });
    return Games;
  }
  
const urllib = require('urllib');

urllib.request('http://cnodejs.org/', function (err, data, res) {
    if (err) {
      throw err; // you need to handle error
    }
    console.log(res.statusCode);
    console.log(res.headers);
    // data is Buffer instance
    console.log(data.toString());
  });