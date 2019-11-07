import React from "react";
import Scene from "../../components/Scene";
import Header from "../../components/Header";
import SceneContainer from "../../containers/SceneContainer";
import LeftContainer from "../../containers/LeftContainer.js";
import MiddleContainer from "../../containers/MiddleContainer.js";
import RightContainer from "../../containers/RightContainer.js";
import "../../App.css";

const Home = () => {
  return (
    <div className="App">
      <div className="MainContent">
        <LeftContainer>
          {/*Content goes here*/}
        </LeftContainer>
        <MiddleContainer>
          <SceneContainer>
            <Scene />
          </SceneContainer>
          {/*More content can go here*/}
        </MiddleContainer>
        <RightContainer>
          {/*Content goes here*/}
        </RightContainer>
      </div>
    </div>
  );
};

export default Home;
