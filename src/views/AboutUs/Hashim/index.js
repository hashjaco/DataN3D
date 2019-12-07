import React, { Component } from "react";
import "./index.css";

let data = [
  {
    title: "React",
    src: require("./assets/react.svg"),
    alt: "React Logo"
  },
  {
    title: "Figma",
    src: require("./assets/figma-1.svg"),
    alt: "Figma Logo"
  },
  {
    title: "Prettier",
    src: require("./assets/prettier-1.svg"),
    alt: "Prettier Logo"
  },
  {
    title: "Linux",
    src: require("./assets/linux-tux.svg"),
    alt: "Linux Logo"
  },
  {
    title: "Maya",
    src: require("./assets/maya-2017.svg"),
    alt: "Maya Logo"
  },
  {
    title: "Node.js",
    src: require("./assets/nodejs-2.svg"),
    alt: "Node.js Logo"
  },
  {
    title: "C++",
    src: require("./assets/c++.svg"),
    alt: "C++ Logo"
  },
  {
    title: "Sequelize.js",
    src: require("./assets/sequelize.svg"),
    alt: "Sequelize Logo"
  },
  {
    title: "Java",
    src: require("./assets/java-14.svg"),
    alt: "Java Logo"
  },
  {
    title: "Unity",
    src: require("./assets/unity-69.svg"),
    alt: "Unity Logo"
  },
  {
    title: "PostgreSQL",
    src: require("./assets/postgresql.svg"),
    alt: "PostgreSQL Logo"
  }
];

const Card = props => {
  return (
    <div style={{ display: "inline-block" }} className="technology">
      <img src={props.src} alt={props.alt} />
      <h5>{props.title}</h5>
    </div>
  );
};

export default class Hashim extends Component {
  render() {
    return (
      <>
        <div id="coverPhoto" />
        <div id="profile">
          <img
            src={require("./assets/zaddy.png")}
            alt="Hashim's Face"
            id="profile-img"
          />
        </div>
        <div id="main">
          <div id="about">
            {/*<h3>About Me</h3>*/}
            <p id="aboutContent">
              Hi! I'm Hashim, a full stack software engineer residing in San
              Francisco, California. I am currently a senior at San Francisco
              State University, graduating at the end of the year. Solving the
              most complex problems is a passion of mine as it is challenging
              and rewarding.
            </p>
          </div>
        </div>
        <div id="skills">
          {data.map(prop => {
            return <Card src={prop.src} alt={prop.alt} title={prop.title} />;
          })}
        </div>
      </>
    );
  }
}
