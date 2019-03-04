const AWS = require('aws-sdk');

module.exports = {
  raw: new AWS.DynamoDB(),
  doc: new AWS.DynamoDB.DocumentClient(),
};
