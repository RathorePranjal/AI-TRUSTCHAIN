const axios = require('axios');

async function demo() {
  console.log('AI Plagiarism Checker Demo');
  console.log('==========================');
  
  // Test texts
  const testTexts = [
    "This is a simple human-written sentence with normal punctuation and structure.",
    "Leveraging cutting-edge machine learning paradigms, this comprehensive analysis synthesizes multifaceted insights to deliver a scalable, data-driven solution that optimizes stakeholder outcomes.",
    "Artificial intelligence is revolutionizing industries across the globe. With its ability to process vast amounts of data and identify patterns, AI is transforming how we work, communicate, and solve complex problems. As we continue to develop more sophisticated AI systems, we must also consider the ethical implications and ensure that these technologies are used responsibly."
  ];
  
  // API endpoint
  const API_URL = 'http://localhost:4000/api/analyze/text';
  
  for (let i = 0; i < testTexts.length; i++) {
    console.log(`\nTest ${i + 1}:`);
    console.log(`Text: ${testTexts[i].substring(0, 100)}${testTexts[i].length > 100 ? '...' : ''}`);
    
    try {
      const response = await axios.post(API_URL, { text: testTexts[i] });
      const result = response.data.result;
      
      console.log(`Result: ${result.verdict}`);
      console.log(`Human Probability: ${(result.human_probability * 100).toFixed(2)}%`);
      console.log(`AI Probability: ${(result.ai_probability * 100).toFixed(2)}%`);
      console.log(`Confidence: ${(result.confidence * 100).toFixed(2)}%`);
    } catch (error) {
      console.error('Error:', error.message);
    }
    
    console.log('-'.repeat(50));
  }
  
  console.log('\nDemo completed!');
}

// Run demo
demo();
