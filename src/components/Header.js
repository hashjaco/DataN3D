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
    width: "100vw",
    height: "8vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000"
  },
  title: {
    fontSize: 45,
    color: "#f3f3f3",
    fontWeight: "bold",
  }
}