const AWS = require('aws-sdk');
const axios = require('axios');
const db = require('/opt/data');
const url = 'http://checkip.amazonaws.com/';
let response;

const ssm = new AWS.SSM();
let sessionSecret;

exports.lambdaHandler = async (event, context) => {
  if (!sessionSecret) {
    console.log('warming cache');
    ({Parameter: {Value: sessionSecret}} = await ssm
      .getParameter({Name: '/absently-dev/sessionSecret'})
      .promise());
  }
  console.log(sessionSecret);

  const res = await db.doc.scan({ TableName: process.env.TABLE_NAME }).promise();
  console.log(res);

  try {
    const ret = await axios(url);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'hello world',
        location: ret.data.trim(),
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
