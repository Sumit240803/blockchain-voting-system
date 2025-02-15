"use client"
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import VotingABI from '../../VotingABI.json'

const contractAddress ="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const useVotingContract = () => {
  const[account , setAccount] = useState(null);
  const [contract ,setContract] = useState(null);
  const [ candidates , setCandidates] = useState([]);

  const connectWallet = async()=>{
    if(window.ethereum){
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setAccount(await signer.getAddress());
        const votingContract = new ethers.Contract(contractAddress ,VotingABI.abi,signer);
        setContract(votingContract);
    }else{
        alert("Please install MetaMask!");
    }
  }
  const fetchCandidates = async () => {
    if (contract) {
      const data = await contract.getCandidates();
      setCandidates(data.map(([name, votes]) => ({ name, votes: Number(votes) })));
    }
  };
  
  const vote = async(index)=>{
    if(contract){
        await contract.vote(index);
        alert("Vote Casted");
        fetchCandidates();
    }
  }
  useEffect(()=>{
    if(contract) fetchCandidates();

  },[contract]);

  return {account ,candidates,connectWallet,vote};
}

export default useVotingContract