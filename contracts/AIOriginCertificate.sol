// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title AI-Origin Certificate Contract
/// @notice Stores authenticity certificates for analyzed content
contract AIOriginCertificate {
    struct Certificate {
        string subject;
        string analysisResult;
        string timestamp;
        address issuer;
    }

    mapping(bytes32 => Certificate) public certificates;

    event CertificateMinted(
        bytes32 indexed id,
        string subject,
        string analysisResult,
        string timestamp,
        address issuer
    );

    function mintCertificate(
        string memory subject,
        string memory analysisResult,
        string memory timestamp
    ) public returns (bytes32) {
        bytes32 id = keccak256(
            abi.encodePacked(subject, analysisResult, timestamp, msg.sender, block.timestamp)
        );
        certificates[id] = Certificate(subject, analysisResult, timestamp, msg.sender);
        emit CertificateMinted(id, subject, analysisResult, timestamp, msg.sender);
        return id;
    }

    function verifyCertificate(bytes32 id) public view returns (Certificate memory) {
        return certificates[id];
    }
}
