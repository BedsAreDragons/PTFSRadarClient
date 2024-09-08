// functions/fetch_flight_data.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
    // Get sensitive data from environment variables
    const apiread = process.env.READPASS;

    try {
        // Make the POST request to the external API
        const response = await fetch('https://ptfsradar.onrender.com/get_flight_data/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: apiread })
        });

        // Check if the response is okay and parse JSON
        if (response.ok) {
            const data = await response.json();
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            };
        } else {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'API request failed', statusText: response.statusText })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
        };
    }
};
