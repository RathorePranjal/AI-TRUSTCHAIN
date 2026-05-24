import { spawn } from 'child_process';

// Test text
const text = "In today's fast-paced digital landscape, leveraging cutting-edge AI technologies is paramount for businesses seeking to maintain a competitive edge.";

// Call the Python script directly
const python = spawn('python', ['backend/detectors/ai_text_detector.py', text]);

let data = '';
let error = '';

python.stdout.on('data', (chunk) => {
  data += chunk.toString();
  console.log('stdout:', chunk.toString());
});

python.stderr.on('data', (chunk) => {
  error += chunk.toString();
  console.log('stderr:', chunk.toString());
});

python.on('close', (code) => {
  console.log(`Process exited with code ${code}`);
  if (code !== 0) {
    console.log('Error:', error);
  } else {
    try {
      const result = JSON.parse(data);
      console.log('Parsed result:', result);
    } catch (err) {
      console.log('Failed to parse output:', err.message);
      console.log('Raw data:', data);
    }
  }
});

python.on('error', (err) => {
  console.log('Failed to start Python process:', err.message);
});
