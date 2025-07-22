import React from 'react';

const VoterRow = ({ voter, onRemove }) => {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-2">{voter.id}</td>
      <td className="px-4 py-2">{voter.name}</td>
      <td className="px-4 py-2">{voter.course}</td>
      <td className="px-4 py-2">{voter.year}</td>
      <td className="px-4 py-2">{voter.contact}</td>
      <td className="px-4 py-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            voter.hasVoted ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
          }`}
        >
          {voter.hasVoted ? 'Voted' : 'Not Voted'}
        </span>
      </td>
      <td className="px-4 py-2">
        <button
          onClick={() => onRemove(voter.id)}
          className="text-red-500 hover:text-red-700 transition font-medium"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default VoterRow;
