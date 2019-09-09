'use strict'

const fetch = require("node-fetch");
let apiKey = 'b078a7d81849e7d2b796924e54583a40';
let yourCity = 'dnipro';
let url = `http://api.openweathermap.org/data/2.5/weather`;

const AWS = require('aws-sdk');
AWS.config.update({ region: "eu-central-1"});
let params = null;

module.exports.putWeatherData = async (event, context) => {
  const weather = await fetch(`${url}?q=${yourCity}&appid=${apiKey}`);
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1"});

  let responseBody = "";
  let statusCode = 0;

  let params = {
    TableName: "first-attempt-dev",
    Item: {
      id: "1",
      weatherdata: await weather.json()
    }
  };

  try {
    data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (err) {
    responseBody = `Unable to put data: ${err}`;
    statusCode  = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type" : "application/json"
    },
    body: responseBody
  };
  return response;
};

module.exports.getWeatherData = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1"});

  let responseBody = "";
  let statusCode = 0;

  let params = {
    TableName: "first-attempt-dev",
    Key: {
      id:'1'
    }
  }

  try {
    let data = await documentClient.get(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (err) {
    responseBody = `Unable to read data: ${err}`;
    statusCode  = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type" : "application/json"
    },
    body: responseBody
  };
  return response;
};