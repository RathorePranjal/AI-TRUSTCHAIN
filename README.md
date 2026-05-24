# AI TrustChain

AI TrustChain is a comprehensive solution for detecting AI-generated content across multiple file types including text, images, videos, and code. This project provides a complete system for verifying the authenticity of digital content in the age of AI.

## Features

- **Multi-format Support**: Detect AI-generated content in text, images, videos, and code files
- **Blockchain Integration**: Mint authenticity certificates on the blockchain
- **Web Interface**: User-friendly web application for content analysis
- **API Service**: RESTful API for integration with other systems
- **AI Detection**: Advanced algorithms for identifying AI-generated content

## Project Structure

- `frontend/`: React-based web interface
- `backend/`: Node.js API service with Python AI detection
- `contracts/`: Solidity smart contracts for blockchain integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.7 or higher)
- Ethereum wallet (for blockchain features)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

4. Install Python dependencies for AI detection:
   ```
   cd backend
   pip install -r requirements.txt
   ```

### Running the Application

1. Start the backend service:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

3. Open your browser to `http://localhost:3000`

## AI Text Detection

The text analysis feature uses a combination of heuristic analysis and machine learning models to detect AI-generated content. The system can identify patterns commonly found in text produced by large language models.

## Blockchain Integration

Authenticity certificates can be minted on the blockchain to provide permanent proof of content origin. This feature uses Ethereum smart contracts to store certificate data.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
