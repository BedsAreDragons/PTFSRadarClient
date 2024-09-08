// functions/fetch_flight_data.js

const fetch = require('node-fetch');

exports.handler = async (event) => {
    const apiPassword = "ZzhoazFwcnNlaGt6cTIyZTgzaTQ2dnp3eGFhdmhwc3IK";  // Get the password from environment variables

    try {
        // Send POST request to the external API
        const response = await fetch('https://ptfsradar.onrender.com/get_flight_data/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: apiPassword })
        });

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
