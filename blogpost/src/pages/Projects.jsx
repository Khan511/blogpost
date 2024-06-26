import CallToAction from "./../components/callToAction/CallToAction";
const Projects = () => {
  return (
    <div className="  min-h-screen ">
      <div className="mx-auto mt-5 max-w-7xl md:mt-28">
        <div className="flex flex-col items-center ">
          <h1 className="my-2 text-3xl ">Projects</h1>
          <p className="my-5 p-1 text-center">
            Build fun and engaging projects while learning HTML, CSS, and
            JavaScript.
          </p>
          <div>
            <CallToAction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
