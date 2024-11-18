import IdeaList from '@components/IdeaList';

const Home = () => {
  return (
    <section className="hero flex-center flex w-full flex-col bg-opacity-80 bg-[url('/images/bg.png')] bg-contain bg-center bg-no-repeat py-32 lg:py-64">
      <h1 className="hero-heading font-semi-bold font-Syn gradient-text text-center text-4xl text-white [text-shadow:_3px_1px_50px_rgb(0_0_0_/_80%)] md:text-6xl lg:text-8xl">
        Fueling Innovation
      </h1>
      <h2 className="hero-subheading text-md pt-2 text-center font-OpenSans font-thin text-white [text-shadow:_3px_1px_30px_rgb(0_0_0_/_60%)] md:text-2xl">
        Share and Discover Startup Ideas
      </h2>
    </section>
  );
};

export default Home;
