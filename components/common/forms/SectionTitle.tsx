import React from 'react';

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-1 rounded-full bg-gradient-to-b from-teal-500 to-emerald-500" />
      <h3 className="text-gray-900 text-lg font-medium">{title}</h3>
    </div>
  );
};

export default SectionTitle;
