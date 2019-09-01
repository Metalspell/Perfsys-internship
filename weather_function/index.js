const config = require('./config.js');
const request = require('request');
config.apiKey();
config.yourCity();
let url = `http://api.openweathermap.org/data/2.5/weather?q=${config.yourCity()}&appid=${config.apiKey()}`;

request(url, (err, response, body) => {
  if(err){
    console.log('Upss, something wrong!:', err);
  } else {
    console.log('Actual weather parameters:', body);
  }
});

// curl http://v2.wttr.in - fine solution which I liked:)
