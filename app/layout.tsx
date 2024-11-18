import "@styles/globals.css";
import { ReactNode } from "react";
import Header from "@components/Header";
import Provider from "@components/Provider";

export const metadata = {
  title: "Startup Toolkit",
  description:
    "A community-driven resource hub where entrepreneurs and founders share valuable insights, tools, and tips for building and growing startups. Find curated resources on funding, marketing, product development, and more.",
};

interface RootProps {
  children: ReactNode;
}

const Root = ({ children }: RootProps) => {
  return (
    <html lang="en">
      <body>
        <main className="app-wrapper w-full h-screen bg-black flex justify-center">
          <div className="app w-full max-w-[1320px] h-screen">
           <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
};

export default Root;
