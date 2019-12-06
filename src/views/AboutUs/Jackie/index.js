import React, { Component } from "react";
import Header from "../../../components/Header";
import "./index.css"

export default class Jackie extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div className="bg">
        <div className="main-text">
          <h5>Hello I'm</h5>
          <h1>Jackie Shan</h1>
          <h5>Student</h5>
          <h6>Computer Science Major at SFSU</h6>
          <p>My inspirations are to become a web and mobile app developer.</p>
        </div>
      </div>
      
    );
  }
}
/*<Header title="Jackie" />*/