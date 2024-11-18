import IdeaList from "@components/IdeaList";

const Home = () => {
  return (
    <section className="hero bg-[url('/images/bg.png')] bg-contain bg-no-repeat bg-center bg-opacity-80 md:py-64 py-16 flex flex-center flex-col w-full ">
      <h1 className="hero-heading font-semi-bold text-center text-8xl font-Syn text-white gradient-text [text-shadow:_3px_1px_50px_rgb(0_0_0_/_80%)]">
        Fueling Innovation
      </h1>
      <h2 className="hero-subheading font-light text-center text-2xl font-OpenSans  text-white pt-2 [text-shadow:_3px_1px_30px_rgb(0_0_0_/_60%)]">
        Share and Discover Startup Ideas
      </h2>
    </section>
  );
};

export default Home;
