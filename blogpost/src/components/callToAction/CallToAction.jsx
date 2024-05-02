import { Button } from "flowbite-react";
import React from "react";

const CallToAction = () => {
  return (
    <div className=" flex  flex-col  rounded-br-3xl rounded-tl-3xl border-4 border-teal-500 p-4 sm:flex-row">
      <div className=" flex flex-1 flex-col items-center justify-center gap-3 p-5 text-center">
        <h2>Want to see my Portfolio webSite?</h2>
        <p>You can checout the projects i made</p>
        <Button className="mt-5 w-full rounded-bl-none rounded-br-xl rounded-tl-xl rounded-tr-none">
          <a href="https://portfolio-naji.netlify.app/" target="_blank">
            Want to see My Portfolio?
          </a>
        </Button>
      </div>
      <div className="flex-1 p-5">
        <img
          className="rounded-xl"
          src="https://miro.medium.com/v2/resize:fit:1200/1*LyZcwuLWv2FArOumCxobpA.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default CallToAction;
