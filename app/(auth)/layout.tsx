import React from 'react';
import { ReactNode } from 'react';

type RootProps = {
  children: ReactNode;
};

const Root = ({ children }: RootProps) => {
  return (
    <div className="h-screen w-screen">
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-purple-800/30 blur-[100px]" />
          <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] animate-pulse rounded-full bg-blue-800/30 blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/3 h-[600px] w-[600px] animate-pulse rounded-full bg-indigo-800/30 blur-[100px]" />
        </div>
        <div className="z-10 flex flex-col items-center justify-center">{children}</div>
      </section>
    </div>
  );
};

export default Root;
