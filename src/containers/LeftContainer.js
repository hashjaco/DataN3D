import React, { Component } from "react";
import { List } from "antd";
import { FixedSizeList as VList } from "react-window";
import ListSection from "../components/ListSection";

const data = require("../data/spiral");

class LeftContainer extends Component {
  renderRow = ({ index, key, style }) => {
    return (
        <ListSection
          key={key}
          name={index.name}
          dataPointX={index.x}
          dataPointY={index.y}
          dataPointZ={index.z}
        />
    );
  };

  render() {
    return (
      <div style={styles.leftContainer}>
          <VList itemCount={data.length} itemSize={200} height={window.innerHeight} width={200} >
            {this.renderRow}
          </VList>
      </div>
    );
  }
}

const styles = {
  leftContainer: {
    display: "inline-block",
    flex: 1,
    flexDirection: "row",
    borderRightStyle: "solid",
    borderColor: "#343a40",
    borderWidth: 0.5
    // width: "20%"
  }
};

export default LeftContainer;
