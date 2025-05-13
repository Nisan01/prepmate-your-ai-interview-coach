import React from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import logo from "../../public/images/logof.png"; // Adjust the path as necessary

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer
        className="text-white py-10 bg-cover bg-center w-full"
        style={{ backgroundImage: "url('/images/footer-bg.png')" }}
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left pl-6">
          {/* Logo and Tagline */}
          <div>
            <Image
              src={logo} // Use the imported logo variable
              alt="PrepMate Logo"
              width={100}
              height={100}
              className="mb-4 mx-auto md:mx-0"
            />
            <h2 className="text-2xl font-bold mb-2">PrepMate</h2>
            <p className="text-gray-300">
              From nervous to natural — PrepMate prepares you
            </p>
          </div>

          {/* Email Subscription */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Keep in touch</h3>
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded-lg bg-white text-gray-500 mb-2"
            />
            <button className="w-full bg-[#7761b0] py-2 rounded-lg hover:bg-purple-700">
              Subscribe
            </button>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Follow us</h3>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook
                  size={30}
                  className="hover:text-blue-500 cursor-pointer"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram
                  size={30}
                  className="hover:text-pink-500 cursor-pointer"
                />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube
                  size={30}
                  className="hover:text-red-500 cursor-pointer"
                />
              </a>
            </div>
            <p className="text-gray-300 mb-2">
              Stay connected with us on social media
            </p>
          </div>

          {/* Contact Number */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Contact</h3>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.5m0 0L2.25 6.75m9.75 6.5v6.5"
                />
              </svg>
              <p className="text-gray-300">prepmate@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} PrepMate. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
