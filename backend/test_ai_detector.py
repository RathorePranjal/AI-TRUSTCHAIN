import sys
import os

# Add the detectors directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'detectors'))

from ai_text_detector import detect_ai_text

def test_ai_detector():
    # Test cases
    test_cases = [
        "This is a simple human-written sentence with normal punctuation and structure.",
        "Leveraging cutting-edge machine learning paradigms, this comprehensive analysis synthesizes multifaceted insights to deliver a scalable, data-driven solution that optimizes stakeholder outcomes.",
        "The quick brown fox jumps over the lazy dog. This is a well-known pangram used for testing.",
        "Artificial intelligence is revolutionizing industries across the globe. With its ability to process vast amounts of data and identify patterns, AI is transforming how we work, communicate, and solve complex problems. As we continue to develop more sophisticated AI systems, we must also consider the ethical implications and ensure that these technologies are used responsibly.",
    ]
    
    print("Testing AI Text Detector")
    print("=" * 50)
    
    for i, text in enumerate(test_cases, 1):
        print(f"\nTest Case {i}:")
        print(f"Text: {text[:100]}{'...' if len(text) > 100 else ''}")
        
        result = detect_ai_text(text)
        print(f"Result: {result}")
        print("-" * 30)

if __name__ == "__main__":
    test_ai_detector()
