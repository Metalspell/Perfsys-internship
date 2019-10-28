const fetch = require("node-fetch");
const uuid = require ("uuid/v4");
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });
let params = null;
const documentClient = new AWS.DynamoDB.DocumentClient({region: process.env.REGION});

module.exports.putWeatherData = async (event, context) => {
  const weather = await fetch(`${process.env.URL}?q=${process.env.YOUR_CITY}&appid=${process.env.API_KEY}`);
  let responseBody = "";
  let statusCode = 0;

  let params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: uuid(),
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
      "Content-Type" : "application/JSON"
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
      id: '8e890b5a-2b23-453e-aeda-7b44895db225'
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
      "Content-Type" : "application/JSON"
    },
    body: responseBody
  };
  return response;
};
