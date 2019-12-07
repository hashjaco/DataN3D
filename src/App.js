import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Routes from './routes'
import Navigation from './navigation'

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <>
        <Navigation style={{ zIndex: 1 }} />
        <Routes />
      </>
    )
  }
}

const styles = {
  app: {
    flex: 1,
    marginTop: 0
  }
}
