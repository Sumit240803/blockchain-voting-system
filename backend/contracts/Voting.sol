// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting{
    struct Candidate {
        string name;
        uint voteCount;
    }

    address public admin;
    mapping (address => bool) public hasVoted;
    Candidate[] public candidates;
    event Voted(address voter , uint candidateIndex);
    event CandidateAdded(string name);

    modifier onlyAdmin {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    constructor(){
        admin = msg.sender;
    }

    function addCandidate(string memory _name) public onlyAdmin{
        candidates.push(Candidate(_name,0));
        emit CandidateAdded(_name);
    }

    function vote(uint _candidateIndex) public{
        require(!hasVoted[msg.sender] , "You have already voted");
        require(_candidateIndex < candidates.length  , "Invalid candidate Index");

        candidates[_candidateIndex].voteCount++;
        hasVoted[msg.sender] = true;

        emit Voted(msg.sender , _candidateIndex);
    }

    function getCandidates() public view returns (Candidate[] memory){
        return candidates;
    }

    function getResults() public view returns(string memory winner , uint highestVotes){
        require(candidates.length > 0 , "No Candidates Available");

        uint maxVotes = 0;
        uint winnerIndex = 0;

        for(uint i = 0 ; i < candidates.length ; i++){
            if(candidates[i].voteCount > maxVotes){
                maxVotes = candidates[i].voteCount;
                winnerIndex = i;
            }
        }
        return (candidates[winnerIndex].name , maxVotes);
    }
}