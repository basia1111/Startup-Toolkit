import '@styles/globals.css';
import React from 'react';
import { ReactNode } from 'react';
import Header from '@components/Header/Header';
import Provider from '@components/Provider';
import { ModalContextProvider } from '@contexts/ModalContext';
import Modal from '@components/Modal';

export const metadata = {
  title: 'Startup Toolkit',
  description:
    'A community-driven resource hub where entrepreneurs and founders share valuable insights, tools, and tips for building and growing startups. Find curated resources on funding, marketing, product development, and more.',
};

type RootProps = {
  children: ReactNode;
};

const Root = ({ children }: RootProps) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <ModalContextProvider>
            <main className="app-wrapper relative flex min-h-screen w-full flex-col items-center bg-black">
              <Header />
              {children}
              <Modal />
            </main>
          </ModalContextProvider>
        </Provider>
      </body>
    </html>
  );
};

export default Root;
