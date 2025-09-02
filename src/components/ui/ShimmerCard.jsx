import React from 'react';

const ShimmerCard = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`}></div>
  );
};

export default ShimmerCard;