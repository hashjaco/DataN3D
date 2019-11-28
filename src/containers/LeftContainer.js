import React from 'react';
import ListSection from '../components/ListSection';
import ReactList from 'react-list';

const data = require('../data/spiral') || [];

const LeftContainer = () => {
  return (
    <div style={styles.leftContainer}>
      <h3>DataSet</h3>
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
    </div>
  );
};

const styles = {
  leftContainer: {
    display: 'inline-block',
    height: '100%',
    // borderRightStyle: 'solid',
    // borderColor: '#343a40',
    // borderWidth: 0.5,
    width: '30%',
    backgroundColor: '#dddfe6',
    // marginLeft: 10,
    overflowY: 'auto',
    fontSize: 13
  }
};

export default LeftContainer;
