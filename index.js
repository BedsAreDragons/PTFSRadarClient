// index.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const password = process.env.READPASS; // Environment variable in AWS Lambda

  const response = await fetch('https://ptfsradar.onrender.com/get_flight_data/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

