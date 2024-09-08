document.getElementById('fetchData').addEventListener('click', async () => {
    const url = 'https://ptfsradar.onrender.com/get_flight_data';
    const readapi = "ZzhoazFwcnNlaGt6cTIyZTgzaTQ2dnp3eGFhdmhwc3IK"
    const payload = { password: readapi };
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Print result in the console
        console.log(data);
        
        // Or print result in the HTML page
        document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
});
