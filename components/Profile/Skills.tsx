import React from 'react';

const Skills = () => {
  return (
    <div className="mb-6">
      <h2 className="text-gray mb-4 text-2xl font-semibold">Skills</h2>
      <div className="flex flex-wrap gap-2">
        <div className="bg-lightGray text-gray rounded-full px-4 py-2 text-sm font-medium">
          skill
        </div>
        <div className="bg-lightGray text-gray rounded-full px-4 py-2 text-sm font-medium">
          another skill
        </div>
        <div className="bg-lightGray text-gray rounded-full px-4 py-2 text-sm font-medium">
          third skill
        </div>
      </div>
    </div>
  );
};

export default Skills;
