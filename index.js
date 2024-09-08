require('dotenv').config()

const apiread = process.env.READPASS

const response = await fetch('https://ptfsradar.onrender.com/get_flight_data/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if needed
  },
  body: JSON.stringify({
    password: apiread
  })
});
