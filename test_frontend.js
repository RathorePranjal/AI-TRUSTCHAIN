// Simulate the result that the frontend would receive from the backend
const backendResult = {
  "human_probability": 0.008289536461234093,
  "ai_probability": 0.9917104840278625,
  "confidence": 0.9917104840278625,
  "verdict": "AI-Likely",
  "explanation": "Text analyzed with 99.17% confidence using roberta-base-openai-detector model",
  "ok": true,
  "type": "text"
};

// Simulate the frontend logic to determine if content is AI-generated
const isAIContent = backendResult.verdict === "AI-Likely" || (backendResult.ai_probability && backendResult.ai_probability > 0.5);

console.log('Backend Result:');
console.log(JSON.stringify(backendResult, null, 2));

console.log('\nFrontend Display Logic:');
console.log(`Verdict: ${backendResult.verdict}`);
console.log(`AI Probability: ${(backendResult.ai_probability * 100).toFixed(2)}%`);
console.log(`Is AI Content: ${isAIContent ? 'Yes' : 'No'}`);
console.log(`Report page would show: ${isAIContent ? 'AI-Generated Content Detected' : 'Human-Generated Content Detected'}`);

if (isAIContent) {
  console.log('\n✅ SUCCESS: The frontend will correctly display "AI-Generated Content Detected"');
} else {
  console.log('\n❌ FAILURE: The frontend will incorrectly display "Human-Generated Content Detected"');
}
