// functions/fetch_flight_data.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
    // Your sensitive data should be stored in environment variables
    const apiread = process.env.READPASS;

    try {
        const response = await fetch('https://ptfsradar.onrender.com/get_flight_data/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: apiread })
        });

        // Ensure the response is valid JSON
        const data = await response.json();

        return {
            statusCode: response.status,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
        };
    }
};
