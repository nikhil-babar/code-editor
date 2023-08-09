import React from "react";

const links = [
  {
    title: "Github",
    link: "https://github.com/nikhil-babar/code-editor",
  },
  {
    title: "Youtube",
    link: "https://www.youtube.com/watch?v=eJqXES6QvTk",
  },
  {
    title: "LinkedIn",
    link: "www.linkedin.com/in/nikhil-bhimrao-babar",
  },
];

const Footer = () => {
  return (
    <>
      <div className="flex justify-center text-white bg-black p-3">
        <ul className="flex justify-between">
          {links.map(({ title, link }) => {
            return (
              <li key={title} className="border-r-2 border-white px-3 last:border-none">
                <a href={link}>{title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Footer;
