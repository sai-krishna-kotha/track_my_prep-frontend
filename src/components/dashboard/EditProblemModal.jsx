import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { toast } from 'react-hot-toast';

const EditProblemModal = ({ problem, onClose, onProblemUpdated }) => {
  const [formData, setFormData] = useState({ ...problem });

  useEffect(() => {
    setFormData({ ...problem });
  }, [problem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToUpdate = { ...formData };

    if (dataToUpdate.status === 'Solved' && !dataToUpdate.date_solved) {
      const today = new Date().toISOString().split('T')[0];
      dataToUpdate.date_solved = today;
    } else if (dataToUpdate.status !== 'Solved') {
      dataToUpdate.date_solved = null;
    }

    try {
      const response = await apiClient.patch(`/problems/${problem.id}/`, dataToUpdate);
      onProblemUpdated(response.data);
      toast.success('Problem updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update problem.');
      console.error('Failed to update problem', error);
    }
  };

  if (!problem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Problem</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Difficulty</label>
              <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Easy</option><option>Medium</option><option>Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Unsolved</option><option>Attempted</option><option>Solved</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProblemModal;