import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import VotingABI from '../../VotingABI.json'

const contractAddress =process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const useVotingContract = () => {
  const[account , setAccount] = useState(null);
  const [contract ,setContract] = useState(null);
  const [ candidates , setCandidates] = useState([]);

  const connectWallet = async()=>{
    if(window.ethereum){
        const provider = await ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setAccount(await signer.getAddress());
        const votingContract = new ethers.Contract(contractAddress ,VotingABI,signer);
        setContract(votingContract);
    }else{
        alert("Please install MetaMask!");
    }
  }
  const fetchCandidates=async()=>{
    if(contract){
        const data = await contract.getCandidates();
        setCandidates(data);
    }
  }
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