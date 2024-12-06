import React from 'react';
import { ReactNode } from 'react';

type RootProps = {
  children: ReactNode;
};

const Root = ({ children }: RootProps) => {
  return <div className="h-screen w-screen">{children}</div>;
};

export default Root;
