import React from 'react';
import ShimmerCard from '../ui/ShimmerCard';

const DashboardSkeleton = () => {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <div className="space-y-2">
        <ShimmerCard className="h-8 w-1/3" />
        <ShimmerCard className="h-4 w-1/2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ShimmerCard className="h-28" />
        <ShimmerCard className="h-28" />
        <ShimmerCard className="h-28" />
        <ShimmerCard className="h-28" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ShimmerCard className="lg:col-span-2 h-96" />
        <ShimmerCard className="h-96" />
      </div>

      <div className="space-y-4">
        <ShimmerCard className="h-12 w-full" />
        <ShimmerCard className="h-12 w-full" />
        <ShimmerCard className="h-12 w-full" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;