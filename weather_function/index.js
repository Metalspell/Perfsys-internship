let request = require('request');
let apiKey = 'b078a7d81849e7d2b796924e54583a40';
let yourCity = 'dnipro';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${yourCity}&appid=${apiKey}`;

request(url, function (err, response, body) {
  if(err){
    console.log('Upss, something wrong!:', error);
  } else {
    console.log('Actual weather parameters:', body);
  }
});

// curl http://v2.wttr.in - fine solution which I liked:)
