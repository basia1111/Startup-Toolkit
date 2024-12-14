'use client';

import CategoryFilter from '@components/explore/CategoryFilter';
import ProjectGrid from '@components/explore/ProjectGrid';
import Search from '@components/explore/Search';
import React from 'react';

export default function Projects() {
  return (
    <div className="-mt-20 min-h-screen w-full bg-[#0D1117] pt-20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Discover{' '}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Where innovation meets creativity</p>
        </div>

        <div className="mb-8 space-y-4">
          <Search />
          <CategoryFilter />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <ProjectGrid />
          </div>

          <div className="lg:w-80">
            <div className="sticky top-24 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm">
              <h2 className="mb-6 text-lg font-semibold text-white">Trending Projects</h2>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 rounded-lg p-2 hover:bg-white/5"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-500/10 font-semibold text-emerald-400">
                      {index}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white hover:text-emerald-400">
                        Project Name
                      </h3>
                      <p className="text-gray-400 text-sm">1.2k stars this week</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
