import React, { Component } from 'react'


export default class Header extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div style={styles.header}>
        <h1 style={styles.title}>{this.props.title}</h1>
      </div>
    )
  }

}

const styles = {
  header: {
    display: "block",
    top: 0,
    flex: 1,
    height: "8vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#343a40"
  },
  title: {
    fontSize: 26,
    marginLeft: 10,
    color: "#f3f3f3",
  }
}