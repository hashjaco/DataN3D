import React from "react";
import ListSection from "../components/ListSection";

const data = require("../data/spiral") || [];

const LeftContainer = () => {
  return (
    <div style={styles.leftContainer}>
      {data.map(context => (
        <>
          <ListSection
            key={context.name}
            name={context.name}
            dataPointX={context.x}
            dataPointY={context.y}
            dataPointZ={context.z}
          />
        </>
      ))}
      }
    </div>
  );
};

const styles = {
  leftContainer: {
    display: "inline-block",
    height: "100%",
    borderRightStyle: "solid",
    borderColor: "#343a40",
    borderWidth: 0.5,
    width: "20%"
  }
};

export default LeftContainer;
