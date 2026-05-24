import axios from 'axios';

// User's text
const userText = `About
As a B.Tech student specializing in Artificial Intelligence and Data Science, I'm passionate about leveraging technology to solve real-world problems.
Beyond academics, I'm an avid content creator. I've successfully managed my own YouTube channel and Instagram handle, accumulating over 1.1 million views. Whether it's crafting engaging videos or diving into New projects, I'm always eager to learn and contribute.
🎯 Career Aspirations: I aspire to contribute to cutting-edge AI and data science projects, applying my skills to drive innovation and impact. Whether it's developing predictive models or optimizing processes, I'm ready to make a difference.
🌐 Let's Connect! Feel free to reach out—I'm always open to networking, collaborating, and learning from fellow professionals in the field. Let's explore the exciting world of AI and data science together!`;

async function testTextAnalysis() {
  try {
    const response = await axios.post('http://localhost:4000/api/analyze/text', {
      text: userText
    });
    
    console.log('Analysis Result:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testTextAnalysis();
