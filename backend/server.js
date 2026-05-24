require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');
const { ethers } = require('ethers');
const { analyze } = require('./detectors/mockDetector');
const { spawn } = require('child_process');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const PORT = process.env.PORT || 4000;
const CERT_STORE = path.join(__dirname, 'certificates', 'store.json');

app.use(cors());
app.use(express.json());

const frontendDist = path.join(__dirname, '../../frontend/dist');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(frontendDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// Ensure local cert store
async function ensureStore() {
  try {
    await fs.access(CERT_STORE);
  } catch {
    await fs.writeFile(CERT_STORE, JSON.stringify({ certs: [] }, null, 2));
  }
}
ensureStore();

// Connect to contract
async function getContract() {
  const RPC_URL = process.env.RPC_URL || "http://localhost:8545";
  const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const abi = [
    "function mintCertificate(string subject,string analysisResult,string timestamp) public returns (bytes32)",
    "event CertificateMinted(bytes32 indexed id,string subject,string analysisResult,string timestamp,address issuer)"
  ];
  return new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);
}

// Routes
app.get('/', (req, res) => res.json({ ok: true, msg: "Backend running" }));

app.post('/api/analyze/text', async (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ ok: false, error: 'text required' });

  console.log('Received text for analysis:', text.substring(0, 100));

  // Try to use Python AI detector first
  try {
    const pythonResult = await analyzeWithPython(text);
    console.log('Python AI detector result:', pythonResult);
    if (pythonResult.ok) {
      return res.json({ ok: true, result: pythonResult });
    }
  } catch (err) {
    console.error("Python AI detector failed, falling back to mock detector", err);
  }

  // Fallback to mock detector
  const result = await analyze({ type: 'text', text });
  console.log('Mock detector result:', result);
  res.json({ ok: true, result });
});

// Function to call Python AI detector
function analyzeWithPython(text) {
  return new Promise((resolve, reject) => {
    console.log('Attempting to call Python AI detector with text:', text.substring(0, 50) + '...');
    const python = spawn('python', [path.join(__dirname, 'detectors', 'ai_text_detector.py'), text]);
    
    let data = '';
    let error = '';
    
    python.stdout.on('data', (chunk) => {
      data += chunk.toString();
    });
    
    python.stderr.on('data', (chunk) => {
      error += chunk.toString();
    });
    
    python.on('close', (code) => {
      console.log('Python script exited with code:', code);
      if (error) {
        console.log('Python script stderr:', error);
      }
      if (data) {
        console.log('Python script stdout:', data.substring(0, 100) + '...');
      }
      
      if (code !== 0) {
        reject(new Error(`Python script exited with code ${code}: ${error}`));
        return;
      }
      
      try {
        const result = JSON.parse(data);
        console.log('Successfully parsed Python output');
        resolve(result);
      } catch (err) {
        reject(new Error(`Failed to parse Python output: ${err.message}`));
      }
    });
    
    python.on('error', (err) => {
      console.log('Failed to start Python process:', err.message);
      reject(new Error(`Failed to start Python process: ${err.message}`));
    });
  });
}

app.post('/api/analyze/file', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: 'file required' });
  const type = req.file.mimetype.startsWith('audio') ? 'audio'
              : req.file.mimetype.startsWith('video') ? 'video'
              : req.file.mimetype.startsWith('text') ? 'code'
              : 'image';
  const result = await analyze({ type, buffer: req.file.buffer });
  res.json({ ok: true, result });
});

// Mint dummy certificate (unique ID/link for authenticity verification)
app.post('/api/certificate/mint-onchain', async (req, res) => {
  try {
    const { subject, analysisResult } = req.body || {};
    if (!subject || !analysisResult) return res.status(400).json({ ok:false, error:"missing fields" });

    const timestamp = new Date().toISOString();
    const crypto = require('crypto');
    const id = crypto.randomBytes(16).toString('hex');

    console.log('Generating onchain-style certificate:', subject);

    const cert = {
      id,
      subject,
      analysisResult,
      classification: analysisResult.human_probability > 0.5 ? 'Human-Generated' : 'AI-Generated',
      fileType: subject.split('.').pop(),
      timestamp,
      verificationUrl: `${req.protocol}://${req.get('host')}/api/certificate/verify/${id}`,
      authenticityLink: `https://ai-trustchain.vercel.app/verify/${id}`,
      txHash: '0x' + crypto.randomBytes(32).toString('hex') // dummy tx for UI
    };

    const raw = await fs.readFile(CERT_STORE,'utf8');
    const store = JSON.parse(raw);
    store.certs.push(cert);
    await fs.writeFile(CERT_STORE, JSON.stringify(store,null,2));

    res.json({ ok:true, cert });
  } catch(err) {
    console.error('Certificate mint error:', err);
    res.status(500).json({ ok:false, error: err.message });
  }
});

app.post('/api/certificate/mint', async (req, res) => {
  try {
    const { subject, analysisResult } = req.body || {};
    if (!subject || !analysisResult) return res.status(400).json({ ok:false, error:"missing fields" });

    const timestamp = new Date().toISOString();
    // Generate unique certificate ID using crypto-random bytes
    const crypto = require('crypto');
    const id = crypto.randomBytes(16).toString('hex');

    console.log('Generating dummy certificate with subject:', subject);
    console.log('Analysis result:', analysisResult);

    const cert = {
      id,
      subject,
      analysisResult,
      classification: analysisResult.human_probability > 0.5 ? 'Human-Generated' : 'AI-Generated',
      fileType: subject.split('.').pop(),
      timestamp,
      verificationUrl: `${req.protocol}://${req.get('host')}/api/certificate/verify/${id}`,
      authenticityLink: `https://ai-trustchain.vercel.app/verify/${id}` // Placeholder for production URL
    };

    const raw = await fs.readFile(CERT_STORE,'utf8');
    const store = JSON.parse(raw);
    store.certs.push(cert);
    await fs.writeFile(CERT_STORE, JSON.stringify(store,null,2));

    res.json({ ok:true, cert });
  } catch(err) {
    console.error('Certificate generation error:', err);
    res.status(500).json({ ok:false, error: err.message });
  }
});

app.get('/api/certificate/list', async (req,res)=>{
  try {
    const raw = await fs.readFile(CERT_STORE,'utf8');
    res.json(JSON.parse(raw));
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post('/api/certificate/verify', async (req, res) => {
  try {
    const { id } = req.body || {};
    if (!id) return res.status(400).json({ ok: false, error: 'Certificate ID required' });

    const raw = await fs.readFile(CERT_STORE, 'utf8');
    const store = JSON.parse(raw);
    const cert = store.certs.find(c => c.id.toLowerCase() === id.toLowerCase());

    if (!cert) {
      return res.json({ ok: false, valid: false, error: 'Certificate not found' });
    }

    res.json({ ok: true, valid: true, cert });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET endpoint for direct URL verification (for authenticity links)
app.get('/api/certificate/verify/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ ok: false, error: 'Certificate ID required' });

    const raw = await fs.readFile(CERT_STORE, 'utf8');
    const store = JSON.parse(raw);
    const cert = store.certs.find(c => c.id.toLowerCase() === id.toLowerCase());

    if (!cert) {
      return res.json({ ok: false, valid: false, error: 'Certificate not found' });
    }

    res.json({ ok: true, valid: true, cert });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, ()=> console.log(`Backend running at http://localhost:${PORT}`));
