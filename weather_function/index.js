const config = require('./config.js');
const request = require('request');
config.apiKey();
config.yourCity();

request(config.yourUrl(), (err, response, body) => {
  if(err){
    console.log('Upss, something wrong!:', err);
  } else {
    console.log('Actual weather parameters:', body);
  }
});

// curl http://v2.wttr.in - fine solution which I liked:)
