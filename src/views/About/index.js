import React, { Component } from "react";
import Header from "../../components/Header";

export default class About extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Header title="About Alpha Data" />
      </div>
    );
  }
}