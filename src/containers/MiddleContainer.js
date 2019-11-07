import React, {Component} from 'react'
import SceneContainer from "./SceneContainer";

export default class MiddleContainer extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return <div style={styles.middleContainer}>
      <SceneContainer/>
    </div>

  }

}

const styles = {
  middleContainer: {
    display: "inline",
    width: "70%",
    height: "100%",
  }
};