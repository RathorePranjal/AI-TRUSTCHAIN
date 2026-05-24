# AI TrustChain Backend

This is the backend service for the AI TrustChain, which detects AI-generated content in text.

## Features

- Text analysis for AI-generated content
- File upload support for various file types
- Blockchain integration for certificate minting
- RESTful API for easy integration

## Setup

1. Install Node.js dependencies:
   ```
   npm install
   ```

2. Install Python dependencies (for AI text detection):
   ```
   npm run install-python-deps
   ```
   
   Or manually:
   ```
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Create a `.env` file with the following variables:
   ```
   PORT=4000
   RPC_URL=your_ethereum_rpc_url
   PRIVATE_KEY=your_wallet_private_key
   CONTRACT_ADDRESS=your_contract_address
   ```

## Running the Service

Start the development server:
```
npm run dev
```

Or start the production server:
```
npm start
```

## API Endpoints

- `POST /api/analyze/text` - Analyze text for AI-generated content
- `POST /api/analyze/file` - Analyze uploaded file
- `POST /api/certificate/mint-onchain` - Mint authenticity certificate on blockchain
- `GET /api/certificate/list` - List all certificates

## AI Text Detection

The service uses a combination of approaches for AI text detection:

1. **Python-based detection** (primary): Uses heuristic analysis to determine if text is AI-generated
2. **Mock detection** (fallback): Simple random-based detection for demonstration purposes

For a production implementation, you would replace the heuristic analysis with a proper AI model like RoBERTa.
