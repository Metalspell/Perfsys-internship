const fetch = require("node-fetch");
// const axios = require('axios');
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });
let params = null;
const documentClient = new AWS.DynamoDB.DocumentClient({region: process.env.REGION});

module.exports.putWeatherData = async (event, context) => {
  const weather = await fetch(`${process.env.URL}?q=${process.env.YOUR_CITY}&appid=${process.env.API_KEY}`);
  // const weather = await axios.get(`${process.env.URL}?q=${process.env.YOUR_CITY}&appid=${process.env.API_KEY}`);

  let responseBody = "";
  let statusCode = 0;

  let params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: "1",
      weatherdata: await weather.json()
    }
  };

  try {
    data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch (err) {
    responseBody = `Unable to put data: ${err}`;
    statusCode  = 500;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type" : "application/string"
    },
    body: responseBody
  };
  return response;
};

module.exports.getWeatherData = async (event, context) => {

  let responseBody = "";
  let statusCode = 0;

  let params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id:'1'
    }
  }

  try {
    let data = await documentClient.get(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch (err) {
    responseBody = `Unable to read data: ${err}`;
    statusCode  = 500;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type" : "application/string"
    },
    body: responseBody
  };
  return response;
};
