async function analyze({ type, buffer, text }) {
  await new Promise(r => setTimeout(r, 500));
  
  // Simulate AI detection for text
  if (type === 'text' && text) {
    // Simple heuristic to determine if text might be AI-generated
    // (This is just for demonstration - a real implementation would use ML models)
    const wordCount = text.split(/\s+/).length;
    const avgWordLength = text.replace(/\s+/g, '').length / wordCount;
    const punctuationDensity = (text.match(/[.!?;:]/g) || []).length / wordCount;
    
    // Count business jargon words
    const businessJargon = ["leverage", "paradigm", "synergy", "robust", "scalable", "cutting-edge", "innovative", "transformative"];
    const jargonCount = businessJargon.reduce((count, word) => count + (text.toLowerCase().match(new RegExp(word, 'g')) || []).length, 0);
    
    // Simple scoring based on text characteristics
    let aiScore = 0;
    if (wordCount > 50) aiScore += 30; // Longer texts more likely AI
    if (wordCount > 100) aiScore += 20; // Even longer texts
    if (avgWordLength > 5) aiScore += 15; // Complex words
    if (punctuationDensity < 0.01) aiScore += 15; // Less punctuation might indicate AI
    if (punctuationDensity > 0.1) aiScore += 10; // But also very high punctuation might be AI (emoticons, etc.)
    if (jargonCount > 0) aiScore += 20; // Business jargon often in AI text
    if (jargonCount > 2) aiScore += 15; // Multiple instances of jargon
    if (text.includes("AI") || text.includes("Artificial Intelligence")) aiScore += 25; // Mentions of AI itself
    if (text.includes("!") && text.includes("?")) aiScore += 10; // Exclamation and question marks together might be AI
    if (text.includes("://")) aiScore += 5; // URLs
    if (text.includes("@") && text.includes(".")) aiScore += 5; // Email addresses
    
    // Add some randomness
    aiScore = Math.min(100, Math.max(0, aiScore + Math.floor(Math.random() * 30) - 15));
    
    const humanScore = 100 - aiScore;
    
    return {
      ok: true,
      type,
      score: aiScore,
      human_probability: humanScore / 100,
      ai_probability: aiScore / 100,
      verdict: aiScore >= 50 ? "AI-Likely" : "Human-Likely",
      explanation: `Text analyzed with ${Math.max(aiScore, humanScore)}% confidence`,
      details: { 
        wordCount, 
        avgWordLength: parseFloat(avgWordLength.toFixed(2)), 
        punctuationDensity: parseFloat(punctuationDensity.toFixed(4)),
        jargonCount
      },
      raw: { mock: true }
    };
  }
  
  // For other file types, keep the original mock behavior
  const score = Math.floor(Math.random() * 100);
  return {
    ok: true,
    type,
    score,
    verdict: score >= 50 ? "AI-Likely" : "Human-Likely",
    explanation: "Mock detector output — replace with real API",
    raw: { mock: true }
  };
}
module.exports = { analyze };
