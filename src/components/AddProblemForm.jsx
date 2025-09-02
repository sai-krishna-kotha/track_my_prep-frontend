import React, { useState } from 'react';
import apiClient from '../api/apiClient';

function AddProblemForm({ onProblemAdded, toggleVisibility }) {
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('Array');
  const [difficulty, setDifficulty] = useState('Easy');
  const [status, setStatus] = useState('Unsolved');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    const newProblem = { title, source, category, difficulty, status };

    if (newProblem.status === 'Solved') {
      const today = new Date().toISOString().split('T')[0];
      newProblem.date_solved = today;
    }

    try {
      const response = await apiClient.post('/problems/', newProblem);
      onProblemAdded(response.data);
      if (toggleVisibility) {
        toggleVisibility();
      }
    } catch (err) {
      console.error("Failed to add problem", err);
      setError("Failed to add the problem. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">Add a New Problem</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="source" className="block text-sm font-medium text-gray-700">Source (e.g., LeetCode)</label>
            <input type="text" id="source" value={source} onChange={(e) => setSource(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option>Array</option><option>String</option><option>LinkedList</option><option>Tree</option><option>Graph</option><option>DP</option><option>Backtracking</option><option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty</label>
            <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option>Easy</option><option>Medium</option><option>Hard</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option>Unsolved</option><option>Attempted</option><option>Solved</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Add Problem
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProblemForm;