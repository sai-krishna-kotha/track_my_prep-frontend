import React from 'react';

const ProblemLogTable = ({ problems, onEdit, onDelete }) => {
  if (problems.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-700">No Problems Yet!</h3>
        <p className="text-gray-500 mt-2">Click "Log a New Problem" to get started.</p>
      </div>
    );
  }

  return (
    <table className="w-full text-left">
      <thead>
        <tr className="bg-gray-100 text-sm font-semibold text-gray-600 uppercase">
          <th className="p-3">Title</th>
          <th className="p-3">Category</th>
          <th className="p-3">Difficulty</th>
          <th className="p-3">Status</th>
          <th className="p-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {problems.map(problem => (
          <tr key={problem.id} className="hover:bg-gray-50">
            <td className="p-3 font-medium text-gray-800">{problem.title}</td>
            <td className="p-3 text-gray-600">{problem.category}</td>
            <td className="p-3 text-gray-600">{problem.difficulty}</td>
            <td className="p-3">
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${problem.status === 'Solved' ? 'bg-green-100 text-green-800' :
                  problem.status === 'Attempted' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                {problem.status}
              </span>
            </td>
            <td className="p-3 flex items-center justify-end gap-3">
              <button onClick={() => onEdit(problem)} className="text-gray-500 hover:text-blue-600" title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
              </button>
              <button onClick={() => onDelete(problem.id)} className="text-gray-500 hover:text-red-600" title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProblemLogTable;