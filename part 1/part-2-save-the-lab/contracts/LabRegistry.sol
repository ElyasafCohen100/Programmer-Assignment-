// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LabRegistry {
   
    struct Experiment {
        uint256 id;
        string title;
        address owner;
        bool active;
    }

    struct Result {
        address researcher;
        uint256 experimentId;
        string metadataUri;
        uint256 createdAt;
    }

    Experiment[] private experiments;
    Result[] private results;

    event ResultSubmitted(
        address indexed researcher,
        uint256 indexed experimentId,
        string metadataUri,
        uint256 createdAt
    );

    constructor() {
        experiments.push(Experiment(1, "Wallet UX response study", msg.sender, true));
        experiments.push(Experiment(2, "On-chain consent prototype", msg.sender, true));
    }

    // =============== 1 bug - fixed =============== //
    function getAllExperiments() public view returns (Experiment[] memory) {
        return experiments;
    }

    function getResultCount() external view returns (uint256) {
        return results.length;
    }

    // =============== bug 5 - fixed =============== //
    function submitResult(uint256 experimentId, string memory metadataUri) external {

        // ===================== check if exist ===================== //
        require(experimentId > 0 && experimentId <= experiments.length, 
                "experimentId does not exist");

        require(experiments[experimentId - 1].active, "Experiment is not active");

        results.push(
            Result({
                researcher: msg.sender,
                experimentId: experimentId,
                metadataUri: metadataUri,
                createdAt: block.timestamp
            })
        );

        emit ResultSubmitted(msg.sender, experimentId, metadataUri, block.timestamp);
    }
}
