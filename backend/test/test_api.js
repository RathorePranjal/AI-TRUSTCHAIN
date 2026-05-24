const axios = require('axios');

const API_URL = 'http://localhost:4000/api/analyze/text';

async function testTextAnalysis() {
    try {
        const response = await axios.post(API_URL, {
            text: "This is a test to check if the AI detection works."
        });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

testTextAnalysis();
