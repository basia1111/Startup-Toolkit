import React, { useState } from 'react';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('experience');

  const renderContent = () => {
    switch (activeTab) {
      case 'experience':
        return (
          <div className="user-profile-tabs-experience">
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 flex items-center text-xl font-semibold text-gray-800">
                <FaBriefcase className="text-orange mr-3" />
                Professional Experience
              </h3>
              <div className="border-lightGray rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-[#171b21]">TechInnovate Labs</h4>
                  <span className="text-sm text-[#939393]">2021 - Present</span>
                </div>
                <p className="text-base text-[#939393]">Founder & CEO</p>
                <p className="mt-4 text-sm text-[#939393]">
                  Leading a team of 12 engineers developing AI-driven sustainable tech solutions.
                </p>
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="user-profile-tabs-education">
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 flex items-center text-2xl font-bold text-gray-800">
                <FaGraduationCap className="mr-3 text-blue-500" />
                Education
              </h3>
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#eaeaea] bg-white p-6 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-gray text-lg font-semibold">
                      Massachusetts Institute of Technology
                    </h4>
                    <span className="text-sm text-[#939393]">2018</span>
                  </div>
                  <p className="text-base text-[#939393]">MSc in Computer Science</p>
                </div>
                <div className="rounded-2xl border border-[#eaeaea] bg-white p-6 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-gray text-lg font-semibold">
                      Massachusetts Institute of Technology
                    </h4>
                    <span className="text-sm text-[#939393]">2018</span>
                  </div>
                  <p className="text-base text-[#939393]">MSc in Computer Science</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="user-profile-tabs">
      <div className="user-profile-tabs-buttons mb-6 flex w-auto rounded-lg bg-gray-100 p-2">
        {['experience', 'education'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 capitalize transition-colors duration-300 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-[#ff5a00] to-[#ff7000] text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
};

export default Tabs;
