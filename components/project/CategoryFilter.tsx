import Button from '@components/common/buttons/Button';
import React from 'react';
import { PROJECT_CATEGORIES } from '@projectConstants';

const CategoryFilter = () => {
  return (
    <div className="mb-12 flex flex-wrap gap-2">
      {PROJECT_CATEGORIES.map((category) => (
        <Button
          key={category.label}
          className={`transition-all duration-200 ${
            'all' === category.value
              ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500'
              : 'text-gray-300 bg-[#161B22] ring-1 ring-white/10 hover:bg-[#1C2128]'
          }`}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
