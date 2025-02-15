"use client"
import useVotingContract from "./hooks/useVotingContract";


export default function Home() {
  const {account , candidates , connectWallet , vote} = useVotingContract();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <h1 className="text-3xl font-bold">Voting DApp</h1>
      <button
        onClick={connectWallet}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {account ? `Connected: ${account}` : "Connect Wallet"}
      </button>

      <h2 className="mt-5 text-2xl">Candidates</h2>
      {candidates.length > 0 ? (
        candidates.map((candidate, index) => (
          <div key={index} className="mt-3 p-3 bg-white rounded shadow">
            <p>{candidate.name} - Votes: {candidate.voteCount.toString()}</p>
            <button
              onClick={() => vote(index)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Vote
            </button>
          </div>
        ))
      ) : (
        <p className="mt-3">No candidates found</p>
      )}
    </div>
  );
}
