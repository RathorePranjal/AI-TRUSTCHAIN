import sys
import json
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np

# Initialize the model and tokenizer
# Using the roberta-base-openai-detector model as suggested
model_name = "roberta-base-openai-detector"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

def detect_ai_text(text):
    """
    AI text detection using the roberta-base-openai-detector model.
    """
    # Tokenize the input text
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    
    # Get model predictions
    with torch.no_grad():
        outputs = model(**inputs)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
    
    # Extract probabilities
    # The model returns two probabilities: [human, AI]
    human_prob = predictions[0][0].item()
    ai_prob = predictions[0][1].item()
    
    # Determine verdict based on higher probability
    verdict = "AI-Likely" if ai_prob > human_prob else "Human-Likely"
    confidence = max(ai_prob, human_prob)
    
    return {
        "human_probability": human_prob,
        "ai_probability": ai_prob,
        "confidence": confidence,
        "verdict": verdict,
        "explanation": f"Text analyzed with {confidence*100:.2f}% confidence using roberta-base-openai-detector model"
    }

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No text provided"}))
        return
    
    text = sys.argv[1]
    result = detect_ai_text(text)
    result["ok"] = True
    result["type"] = "text"
    print(json.dumps(result))

if __name__ == "__main__":
    main()
