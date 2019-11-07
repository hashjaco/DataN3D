import React, { Component } from "react";
import Header from "../../../components/Header";
import "./index.css"

export default class Jackie extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Header title="Jackie" />
      </div>
    );
  }
}