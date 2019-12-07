import React, { Component } from "react";
import { List } from "react-virtualized";
import { Scrollbars } from "react-custom-scrollbars";
import ListSection from "../components/ListSection";

const data = require("../data/spiral");

class LeftContainer extends Component {
  constructor(props) {
    super(props);
  }

  renderRow = ({ index, key, style }) => {
    return (
      <div style={style}>
        <ListSection
          key={key}
          name={data[index].name}
          dataPointX={data[index].x}
          dataPointY={data[index].y}
          dataPointZ={data[index].z}
        />
      </div>
    );
  };

  render() {
    return (
      <div style={styles.leftContainer}>
        <List
          rowCount={data.length}
          rowHeight={50}
          height={window.innerHeight}
          width={200}
          rowRenderer={this.renderRow}
        />
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
  },
  item: {
    flex: 1,
    width: "100%",
    height: 50
  }
};

export default LeftContainer;
