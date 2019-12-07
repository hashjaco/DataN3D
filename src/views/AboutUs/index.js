import React, { Component } from "react";
import Header from "../../components/Header";
import "./index.css";

export default class AboutUs extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Header title="Meet the Team!" />
      </div>
    );
  }
}