const config = require('./config.js');
const request = require('request');
let apiKey = config.apiKey;
let yourCity = config.yourCity;
let url = config.url;

request(`${url}?q=${yourCity}&appid=${apiKey}`, (err, response, body) => {
  if(err){
    console.log('Upss, something wrong!:', err);
  } else {
    console.log('Actual weather parameters:', body);
  }
});

