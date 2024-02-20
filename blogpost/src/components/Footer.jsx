import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

const FooterComponent = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="mx-auto w-full max-w-7xl">
        <div className="just grid w-full justify-between sm:flex ">
          <div className="">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg font-semibold dark:text-white sm:text-xl"
            >
              <span className="rounded-lg bg-gradient-to-r from-red-500 via-red-200 to-green-300 px-2 py-1">
                Naji's
              </span>
              Blog
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://portfolio-naji.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </Footer.Link>
                <Footer.Link
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </Footer.Link>
                <Footer.Link
                  href="https://www.Yahoo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Yahoo
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/Khan511"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>X</span>
                  <span className="ml-1 text-xs">(Twitter)</span>
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="LEGAL" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Terms & conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div className="flex gap-6 sm:order-1 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
          <Footer.Copyright
            href="#"
            by="Naji's Blog"
            year={new Date().getFullYear()}
          />
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
