import { MdFacebook } from "react-icons/md";
import { FaGithub, FaTelegram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="px-24 py-8 bg-purple text-neutral-content"
      data-aos="fade-up"
    >
      <div className="footer text-white">
        <Link className="link link-hover text-xl" to="/">
          Home
        </Link>
        <Link className="link link-hover text-xl" to="/about">
          About
        </Link>
        <Link className="link link-hover text-xl" to="/contact">
          Contact Us
        </Link>
        <Link className="link link-hover text-xl" to="/terms">
          Terms of use
        </Link>
        <Link className="link link-hover text-xl" to="/privacy">
          Privacy policy
        </Link>
      </div>

      <div className="border-t-2 border-yellow-500 mt-3 pt-6  md:flex justify-between">
        <div className="text-center space-y-3 lg:border-r-2 p-4 border-yellow-500 md:w-1/2">
          <h3 className="text-4xl font-bold">Synaps</h3>
          <h2 className="text-2xl text-yellow-500">Confirm an Order</h2>
          <p>
            Our Support and Sales team is available 24 /7 to answer your queries
          </p>

          <p className="bg-yellow-500 p-4 w-full md:w-3/4 mx-auto text-xl font-bold">
            +8801982345678
          </p>
        </div>
        <div className="text-center space-y-3 md:w-1/2 ">
        
          <div className="mt-8">&copy; 2024. All Rights Reserved.</div>
         <div>
         <a href="https://www.facebook.com/groups/webdevelopmentbatch9/permalink/880573520504178">
            {" "}
            <p>
              <div className="flex items-center justify-center gap-4 text-2xl">
                <MdFacebook />
                <span>Facebook</span>
              </div>
            </p>
          </a>
          <a href="https://twitter.com/i/flow/login">
            {" "}
            <p>
              <div className="flex items-center justify-center gap-4 text-2xl">
                <FaTwitter />
                <span>Twitter</span>
              </div>
            </p>
          </a>
          <a href="https://github.com/">
            <p>
              <div className="flex items-center justify-center gap-4 text-2xl">
                <FaGithub />
                <span>Github</span>
              </div>
            </p>
          </a>
          <a href="https://telegram.org/">
            {" "}
            <p>
              <div className="flex items-center justify-center gap-4 text-2xl">
                <FaTelegram />
                <span>Telegram</span>
              </div>
            </p>
          </a>
         </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
