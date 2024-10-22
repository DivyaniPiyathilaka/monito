import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <div>
      {/* Desktop Footer */}
      <footer className="bg-[#FCEED5] pt-12 pb-6 w-full hidden md:flex md:flex-col md:items-center">
        <div className="flex bg-[#003459] rounded-lg w-full max-w-6xl p-4">
          <div className="flex-1 text-white pr-4">
            <h3 className="text-xl font-extrabold">
              Register Now So You Don't Miss{" "}
              <span className="block">Our Programs</span>
            </h3>
          </div>
          <div className="flex-2 w-2/3">
            <div className="bg-white rounded-lg p-4 flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-md p-2 text-gray-500 flex-grow"
              />
              <button className="bg-[#003459] text-white rounded-md px-4 py-2 ml-2">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Space between sections */}
        <div className="mt-4 w-full max-w-6xl">
          <div className="flex justify-between items-center text-black">
            <div className="flex space-x-4">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/category" className="hover:underline">
                Category
              </Link>
              <Link to="/about" className="hover:underline">
                About
              </Link>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-[#003459]"
              >
                <FaFacebook />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-[#003459]">
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-[#003459]"
              >
                <FaInstagram />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-[#003459]">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Text with increased space above */}
        <div className="flex justify-between items-center w-full max-w-6xl mt-16 text-gray-500">
          <span>&copy; 2022 Monito. All rights reserved.</span>
          <img src={logo} alt="Logo" className="h-8" />
          <div className="flex space-x-4">
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>

      {/* Mobile Footer */}
      <footer className="bg-[#FCEED5] pt-6 pb-4 pl-4 pr-4 w-full flex flex-col items-center md:hidden">
        <div className="flex bg-[#003459] rounded-lg w-full max-w-6xl p-4 mx-4">
          <div className="flex bg-[#003459] rounded-lg w-full max-w-6xl p-4 mx-4 flex-col items-center">
            <div className="flex-1 text-white text-center">
              <h3 className="text-lg font-extrabold">
                Register Now So You Don't Miss{" "}
                <span className="block">Our Programs</span>
              </h3>
            </div>
            <div className="flex-1 mt-4 w-50 mr-8">
              <div className="bg-white rounded-lg p-2 flex items-center justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border border-gray-300 rounded-md p-2 text-gray-500 flex-grow"
                />
                <button className="bg-[#003459] text-white rounded-md px-4 py-1 ml-2">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full max-w-6xl text-center">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-center space-x-4">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/category" className="hover:underline">
                Category
              </Link>
              <Link to="/about" className="hover:underline">
                About
              </Link>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </div>
            <div className="flex justify-center space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-[#003459]"
              >
                <FaFacebook />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-[#003459]">
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-[#003459]"
              >
                <FaInstagram />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-[#003459]">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full max-w-6xl mt-4 text-gray-500">
          <img src={logo} alt="Logo" className="h-8 mb-2" />
          <div className="flex space-x-4 mb-2">
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
          <span>&copy; 2022 Monito. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
