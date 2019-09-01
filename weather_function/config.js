const apiKey = 'b078a7d81849e7d2b796924e54583a40';
const yourCity = 'dnipro';

module.exports.apiKey = () => {
  return apiKey;
}
module.exports.yourCity = () => {
  return yourCity;
}

module.exports.yourUrl = () => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${yourCity}&appid=${apiKey}`;
  return url;
}
