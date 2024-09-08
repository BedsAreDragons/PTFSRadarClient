
const fetch = require('node-fetch'); // Ensure `node-fetch` is included in your serverless environment

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        try {
            const { password } = JSON.parse(event.body);
            const readpass = process.env.READPASS;

            if (password !== readpass) {
                return {
                    statusCode: 403,
                    body: JSON.stringify({ error: 'Unauthorized' })
                };
            }

            // Replace with the actual API endpoint you want to fetch data from
            const response = await fetch('https://ptfsradar.onrender.com/get_flight_data'); 
            const data = await response.json();

            return {
                statusCode: 200,
                body: JSON.stringify(data)
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Internal Server Error' })
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
};
