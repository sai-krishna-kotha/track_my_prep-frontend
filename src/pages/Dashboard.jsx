import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { Toaster, toast } from 'react-hot-toast';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

import AddProblemForm from '../components/AddProblemForm';
import StatCard from '../components/dashboard/StatCard';
import EditProblemModal from '../components/dashboard/EditProblemModal';
import DeleteConfirmationModal from '../components/dashboard/DeleteConfirmationModal';
import ProblemLogTable from '../components/dashboard/ProblemLogTable';
import { useProblemAnalytics } from '../hooks/useProblemAnalytics';
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton';

function Dashboard() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState(null);
  const navigate = useNavigate();

  const analytics = useProblemAnalytics(problems);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await apiClient.get('/problems/');
        setProblems(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      } catch (error) {
        toast.error('Could not fetch problems.');
        if (error.response?.status === 401) navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, [navigate]);

  const toggleFormVisibility = () => setIsFormVisible(!isFormVisible);
  const handleProblemAdded = (newProblem) => { setProblems(prev => [newProblem, ...prev]); toast.success('Problem added successfully!'); };
  const handleProblemUpdated = (updatedProblem) => { setProblems(prev => prev.map(p => (p.id === updatedProblem.id ? updatedProblem : p))); };
  const handleOpenEditModal = (problem) => { setCurrentProblem(problem); setIsEditModalOpen(true); };
  const handleCloseEditModal = () => { setIsEditModalOpen(false); setCurrentProblem(null); };
  const handleOpenDeleteModal = (problemId) => { setProblemToDelete(problemId); setIsDeleteModalOpen(true); };
  const handleCloseDeleteModal = () => { setIsDeleteModalOpen(false); setProblemToDelete(null); };
  const handleConfirmDelete = async () => {
    if (!problemToDelete) return;
    try {
      await apiClient.delete(`/problems/${problemToDelete}/`);
      setProblems(prev => prev.filter(p => p.id !== problemToDelete));
      toast.success('Problem deleted successfully!');
      handleCloseDeleteModal();
    } catch (error) {
      toast.error('Failed to delete problem.');
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="container mx-auto p-4 md:p-6 space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-gray-800">My DSA Progress</h1>
          <p className="text-gray-500">Track your journey to interview success.</p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Solved" value={analytics.totalSolved}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></StatCard>
          <StatCard title="Easy Solved" value={analytics.easySolved}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg></StatCard>
          <StatCard title="Medium Solved" value={analytics.mediumSolved}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></StatCard>
          <StatCard title="Hard Solved" value={analytics.hardSolved}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></StatCard>
        </section>

        <section>
          {!isFormVisible && (<button onClick={toggleFormVisibility} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm">+ Log a New Problem</button>)}
          {isFormVisible && <AddProblemForm onProblemAdded={handleProblemAdded} toggleVisibility={toggleFormVisibility} />}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 xl:col-span-2 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-gray-700 mb-4">Weekly Solved Trend</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={analytics.weeklyTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="solved" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-gray-700 mb-4">Solved by Difficulty</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={analytics.difficultyChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="solved" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="lg:col-span-3 xl:col-span-3 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-gray-700 mb-4">Solved by Category</h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie data={analytics.categoryChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                  {analytics.categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        

        <section className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Problem Log</h2>
          </div>
          <div className="overflow-x-auto">
            <ProblemLogTable problems={problems} onEdit={handleOpenEditModal} onDelete={handleOpenDeleteModal} />
          </div>
        </section>
      </div>

      {isEditModalOpen && <EditProblemModal problem={currentProblem} onClose={handleCloseEditModal} onProblemUpdated={handleProblemUpdated} />}
      <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} onConfirm={handleConfirmDelete} />
    </>
  );
}

export default Dashboard;