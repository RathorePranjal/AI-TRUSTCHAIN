import axios from 'axios';

// Test text from the user
const testText = "In today's fast-paced digital landscape, leveraging cutting-edge AI technologies is paramount for businesses seeking to maintain a competitive edge. Our innovative platform harnesses the power of machine learning algorithms to deliver transformative solutions that drive operational efficiency and enhance customer experiences. By integrating scalable AI frameworks with robust data analytics, we empower organizations to unlock valuable insights from their vast repositories of information. This paradigm shift toward AI-driven decision-making enables companies to anticipate market trends, optimize resource allocation, and foster a culture of continuous innovation. With our state-of-the-art natural language processing capabilities, businesses can now automate complex cognitive tasks, streamline communication processes, and create personalized user interactions that were previously unimaginable. The future of enterprise success lies in embracing these technological advancements and positioning AI as the cornerstone of strategic growth initiatives.";

async function testIntegration() {
  try {
    // Test backend API directly
    console.log('Testing backend API...');
    const backendResponse = await axios.post('http://localhost:4003/api/analyze/text', { text: testText });
    console.log('Backend response:', JSON.stringify(backendResponse.data, null, 2));
    
    // Check if the backend correctly identifies the text as AI-generated
    const result = backendResponse.data.result;
    const isAIContent = result.verdict === "AI-Likely" || (result.ai_probability && result.ai_probability > 0.5);
    console.log('\nAI Content Detection:');
    console.log(`Verdict: ${result.verdict}`);
    console.log(`AI Probability: ${(result.ai_probability * 100).toFixed(2)}%`);
    console.log(`Is AI Content: ${isAIContent ? 'Yes' : 'No'}`);
    
    // Verify the frontend logic would display the correct result
    console.log('\nFrontend Display Logic:');
    console.log(`Report page would show: ${isAIContent ? 'AI-Generated Content Detected' : 'Human-Generated Content Detected'}`);
    
    if (isAIContent) {
      console.log('\n✅ SUCCESS: The application correctly identifies the text as AI-generated');
      console.log('✅ The report page will display "AI-Generated Content Detected"');
    } else {
      console.log('\n❌ FAILURE: The application incorrectly identifies the text as human-generated');
      console.log('❌ The report page will display "Human-Generated Content Detected"');
    }
  } catch (error) {
    console.error('Error testing integration:', error.message);
  }
}

testIntegration();
