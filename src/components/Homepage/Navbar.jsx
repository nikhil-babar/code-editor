import React from "react";
import getGoogleAuthUrl from "..//../utils/getGoogleAuthUrl";
import { Link } from "react-scroll";

const navLink = [
  { title: "Home", id: "home" },
  { title: "Features", id: "feature" },
  { title: "Workspace", id: "workspace" },
];

const Navbar = () => {
  return (
    <section className="flex justify-between lg:px-10 md:px-5 px-4 py-5 items-center text-white">
      <div className="flex items-center gap-3">
        <h3 className="text-center text-xl font-bold">
          Code<span className="text-green-500">Xpert</span>
        </h3>
        <ul className="md:flex relative left-10 gap-5 cursor-pointer hidden">
          {navLink.map(({title, id}) => {
            return (
              <li key={id}>
                <Link
                  to={id}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
          <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <a href={getGoogleAuthUrl()}>Sign in</a>
          </span>
        </button>
      </div>
    </section>
  );
};

export default Navbar;
