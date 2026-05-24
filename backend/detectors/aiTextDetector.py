import os
import sys
import json
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Constants
DEFAULT_LOCAL_PATH = r"C:\Users\PRANJAL\.cache\huggingface\hub\models--roberta-base-openai-detector"
HF_MODEL_NAME = "roberta-base-openai-detector"

def load_model():
    """Load the RoBERTa model for AI text detection."""
    required_files = ["config.json", "tokenizer.json", "pytorch_model.bin", "vocab.json", "merges.txt"]
    
    # Check if model exists locally
    if os.path.exists(DEFAULT_LOCAL_PATH) and all(
        os.path.exists(os.path.join(DEFAULT_LOCAL_PATH, f)) for f in required_files
    ):
        print(f"Loading model from local path: {DEFAULT_LOCAL_PATH}", file=sys.stderr)
        tokenizer = AutoTokenizer.from_pretrained(DEFAULT_LOCAL_PATH)
        model = AutoModelForSequenceClassification.from_pretrained(DEFAULT_LOCAL_PATH)
    else:
        print("Local folder incomplete, downloading from Hugging Face...", file=sys.stderr)
        tokenizer = AutoTokenizer.from_pretrained(HF_MODEL_NAME, cache_dir=DEFAULT_LOCAL_PATH)
        model = AutoModelForSequenceClassification.from_pretrained(HF_MODEL_NAME, cache_dir=DEFAULT_LOCAL_PATH)
    
    return tokenizer, model

def detect_ai_text(text, tokenizer, model):
    """Detect if text is AI-generated using the RoBERTa model."""
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    
    with torch.no_grad():
        outputs = model(**inputs)
    
    probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
    
    human_prob = float(probs[0][0])
    ai_prob = float(probs[0][1])
    
    # Determine verdict based on probabilities
    if ai_prob > human_prob:
        verdict = "AI-Likely"
        confidence = ai_prob
    else:
        verdict = "Human-Likely"
        confidence = human_prob
    
    return {
        "human_probability": human_prob,
        "ai_probability": ai_prob,
        "confidence": confidence,
        "verdict": verdict,
        "explanation": f"Text analyzed with {confidence:.2%} confidence"
    }

def main():
    """Main function to process text from command line arguments."""
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No text provided"}))
        return
    
    # Get text from command line arguments
    text = sys.argv[1]
    
    try:
        # Load model
        tokenizer, model = load_model()
        
        # Analyze text
        result = detect_ai_text(text, tokenizer, model)
        
        # Add success flag
        result["ok"] = True
        result["type"] = "text"
        
        # Output result as JSON
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"ok": False, "error": str(e)}))

if __name__ == "__main__":
    main()
