import React, { Component } from "react";
import * as THREE from "three";

export default class Scene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }

  }

  componentDidMount() {
    this.setState({
      data: this.props.data
    })
  }

  render() {
    return <h1 style={{ fontSize: 40 }}>Hello, Father!</h1>;
  }
}
