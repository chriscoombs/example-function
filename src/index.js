const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

// Function logic belongs here, please modify
const main = event => new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
  new AWS.EC2().describeRegions().promise()
    .then((result) => {
      resolve(result);
    })
    .catch(error => reject(error));
});

// Example for Jest unit test, please remove
const sum = (a, b) => a + b;

// handler function abstracts Lambda callback behaviour and should not be modified
const handler = event => new Promise((resolve, reject) => {
  // Log the input event
  console.log(JSON.stringify(event));
  main(event)
    .then((success) => {
      // Log the output
      console.log(JSON.stringify(success));
      resolve(success);
    })
    .catch((error) => {
      // Log the output
      console.log(JSON.stringify(error));
      reject(error);
    });
});

module.exports = {
  handler,
  main,
  sum,
};
