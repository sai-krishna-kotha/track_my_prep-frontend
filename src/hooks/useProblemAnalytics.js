import { useMemo } from 'react';

export const useProblemAnalytics = (problems) => {
  return useMemo(() => {
    const solvedProblems = problems.filter(p => p.status === 'Solved');

    const categoryCounts = solvedProblems.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    const categoryChartData = Object.keys(categoryCounts).map(key => ({
      name: key, value: categoryCounts[key]
    }));

    // Difficulty data
    const easy = solvedProblems.filter(p => p.difficulty === 'Easy').length;
    const medium = solvedProblems.filter(p => p.difficulty === 'Medium').length;
    const hard = solvedProblems.filter(p => p.difficulty === 'Hard').length;
    const difficultyChartData = [
      { name: 'Easy', solved: easy },
      { name: 'Medium', solved: medium },
      { name: 'Hard', solved: hard },
    ];

    // Weekly trend data
    const today = new Date();
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    const weeklyCounts = solvedProblems.reduce((acc, p) => {
      const date = p.date_solved;
      if (date && last7Days.includes(date)) {
        acc[date] = (acc[date] || 0) + 1;
      }
      return acc;
    }, {});

    const weeklyTrendData = last7Days.map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      solved: weeklyCounts[date] || 0,
    }));

    return {
      totalSolved: solvedProblems.length,
      easySolved: easy,
      mediumSolved: medium,
      hardSolved: hard,
      difficultyChartData,
      weeklyTrendData,
      categoryChartData, 
    };
  }, [problems]);
};